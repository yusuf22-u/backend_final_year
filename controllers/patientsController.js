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
    const {
      first_name,
      last_name,
      email,
      phone,
      address,
      date_of_birth,
      gender,
      medical_record_number,
      insurance
    } = req.body;

    if (!first_name || !last_name || !email || !phone) {
      if (req.file) deleteFile(req.file.path);
      return res.status(400).json({ message: "All required fields are missing" });
    }

    const patientData = {
      first_name,
      last_name,
      email,
      phone,
      address,
      date_of_birth,
      gender,
      medical_record_number,
      insurance,
      profile_image: req.file?.filename || null,
    };

    const patient = await createPatientService(patientData);

    return res.status(201).json({
      message: "Patient created successfully",
      patient
    });

  } catch (error) {

    if (req.file) deleteFile(req.file.path);

    console.error("Create patient error:", error);
    
    if (error.message.includes("already exists")) {
    return res.status(409).json({ message: error.message });
  }

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        message: "Email or Medical Record Number already exists"
      });
    }

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

    const {
      first_name,
      last_name,
      email,
      phone,
      address,
      date_of_birth,
      gender,
      medical_record_number,
      insurance
    } = req.body;

    const updatedData = {
      first_name,
      last_name,
      email,
      phone,
      address,
      date_of_birth,
      gender,
      medical_record_number,
      insurance,
      profile_image: req.file?.filename || patient.profile_image,
    };

    // delete old image if new uploaded
    if (req.file && patient.profile_image) {
      const oldPath = path.join(
        "uploads/patient_profile",
        patient.profile_image
      );
      deleteFile(oldPath);
    }

    const updatedPatient = await updatePatientService(patientId, updatedData);

    return res.status(200).json({
      message: "Patient updated successfully",
      patient: updatedPatient
    });

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

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    if (patient.profile_image) {
      const imagePath = path.join(
        "uploads/patient_profile",
        patient.profile_image
      );
      deleteFile(imagePath);
    }

    await deletePatientService(patientId);

    return res.status(200).json({
      message: "Patient deleted successfully"
    });

  } catch (error) {
    console.error("Delete patient error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};