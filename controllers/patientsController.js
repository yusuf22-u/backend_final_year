import fs from "fs";
import path from "path";
import {
  createPatientService,
  getPatientsService,
  getPatientByIdService,
  updatePatientService,
  deletePatientService,
} from "../services/patientService.js";

// Helper to delete images
const deleteFile = (filePath) => {
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
};

// Create patient
export const createPatient = async (req, res) => {
  try {
    const { first_name, last_name, email, phone, address, date_of_birth } = req.body;

    if (!first_name || !last_name || !email || !phone) {
      // Delete uploaded file if validation fails
      if (req.file) deleteFile(req.file.path);
      return res.status(400).json({ message: "All fields are required" });
    }

    const patientData = {
      first_name,
      last_name,
      email,
      phone,
      address,
      date_of_birth,
      profile_image: req.file?.filename || null,
    };

    const patient = await createPatientService(patientData);
    return res.status(201).json({ message: "Patient created successfully", patient });
  } catch (error) {
    if (req.file) deleteFile(req.file.path);
    console.error("Create patient error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get all patients
export const getAllPatients = async (req, res) => {
  try {
    const patients = await getPatientsService();
    return res.status(200).json(patients);
  } catch (error) {
    console.error("Get patients error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get single patient
export const getPatientById = async (req, res) => {
  try {
    const patientId = req.params.id;
    const patient = await getPatientByIdService(patientId);

    if (!patient) return res.status(404).json({ message: "Patient not found" });

    return res.status(200).json(patient);
  } catch (error) {
    console.error("Get patient error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Update patient
export const updatePatient = async (req, res) => {
  try {
    const patientId = req.params.id;
    const patient = await getPatientByIdService(patientId);

    if (!patient) {
      if (req.file) deleteFile(req.file.path);
      return res.status(404).json({ message: "Patient not found" });
    }

    const { first_name, last_name, email, phone, address, date_of_birth } = req.body;

    const updatedData = {
      first_name,
      last_name,
      email,
      phone,
      address,
      date_of_birth,
      profile_image: req.file?.filename || patient.profile_image,
    };

    // Delete old image if new one uploaded
    if (req.file && patient.profile_image) {
      const oldImagePath = path.join("uploads/patients", patient.profile_image);
      deleteFile(oldImagePath);
    }

    const updatedPatient = await updatePatientService(patientId, updatedData);
    return res.status(200).json({ message: "Patient updated", patient: updatedPatient });
  } catch (error) {
    if (req.file) deleteFile(req.file.path);
    console.error("Update patient error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Delete patient
export const deletePatient = async (req, res) => {
  try {
    const patientId = req.params.id;
    const patient = await getPatientByIdService(patientId);

    if (!patient) return res.status(404).json({ message: "Patient not found" });

    // Delete image if exists
    if (patient.profile_image) {
      const imagePath = path.join("uploads/patients", patient.profile_image);
      deleteFile(imagePath);
    }

    await deletePatientService(patientId);
    return res.status(200).json({ message: "Patient deleted successfully" });
  } catch (error) {
    console.error("Delete patient error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};