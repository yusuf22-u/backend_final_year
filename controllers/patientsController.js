import fs from "fs";
import path from "path";
import {
  createPatientService,
  getPatientsService,
  getPatientByIdService,
  updatePatientService,
  deletePatientService,
  updatePatientByUserService,
  
} from "../services/patientService.js";
import db from "../config/db.js";

// Helper to delete images
const deleteFile = (filePath) => {
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
};

// Create patient
export const createPatient = async (req, res) => {
  try {
    const {
      user_id,
      gender,
      date_of_birth,
      medical_record_number,
      insurance,
      address
    } = req.body;

    // 🔥 determine user_id
    const finalUserId = user_id || req.user.userId;

    // ✅ check if patient already exists
    const [rows] = await db.query(
      "SELECT id FROM patients WHERE user_id = ?",
      [finalUserId]
    );

    if (rows.length > 0) {
      return res.status(409).json({
        message: "Patient profile already exists for this user"
      });
    }

    const patientData = {
      user_id: finalUserId,
      gender,
      date_of_birth,
      medical_record_number,
      insurance,
      address
    };

    const patientId = await createPatientService(patientData);

    return res.status(201).json({
      message: "Patient profile created",
      patientId
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
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
// 👨‍💼 ADMIN UPDATE
export const updatePatientByAdmin = async (req, res) => {
  try {
    const patientId = req.params.id;

    const updated = await updatePatientService(patientId, req.body);

    res.json({
      message: "Patient updated by admin",
      data: updated
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 👤 PATIENT UPDATE OWN PROFILE
export const updateMyPatientProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const updated = await updatePatientByUserService(userId, req.body);

    res.json({
      message: "Profile updated",
      data: updated
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};