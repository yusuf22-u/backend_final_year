import fs from "fs";
import {
  insertPatient,
  findAllPatients,
  findPatientById,
  updatePatientById,
  deletePatientById,
  findPatientByMedical_record_number,
  findPatientByEmail,
  findPatientByUserId
} from "../repositories/patientRepository.js";

// creating patients records
export const createPatientService = async (data) => {

  if (data.medical_record_number) {
    const existing = await findPatientByMedical_record_number(
      data.medical_record_number
    );

    if (existing) {
      throw new Error("Medical Record Number already exists");
    }
    if(data.user_id){
      const existing=await findPatientById(data.user_id)
    }
      if (existing) {
      throw new Error("Patient already exists");
    }
  }

  return await insertPatient(data);
};

export const getPatientsService = async () => {
  return await findAllPatients();
};

export const getPatientByIdService = async (id) => {
  return await findPatientById(id);
};

// 👨‍💼 ADMIN SERVICE
export const updatePatientService = async (id, data) => {

  // 🔒 prevent duplicate user_id
  if (data.user_id) {
    const existing = await findPatientByUserId(data.user_id);

    if (existing && existing.id !== parseInt(id)) {
      throw new Error("This user already has a patient profile");
    }
  }

  return await updatePatientById(id, data);
};

// 👤 PATIENT SERVICE
export const updatePatientByUserService = async (userId, data) => {

  // ❌ BLOCK user_id change
  delete data.user_id;

  return await updatePatientByUserId(userId, data);
};

export const deletePatientService = async (id) => {
  const patient = await findPatientById(id);
  if (!patient) throw new Error("Patient not found");

  // delete image
  if (patient.profile_image) {
    const path = `uploads/patients/${patient.profile_image}`;
    if (fs.existsSync(path)) fs.unlinkSync(path);
  }

  return await deletePatientById(id);
};