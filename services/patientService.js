import fs from "fs";
import {
  insertPatient,
  findAllPatients,
  findPatientById,
  updatePatientById,
  deletePatientById,
  findPatientByMedical_record_number,
  findPatientByEmail
} from "../repositories/patientRepository.js";

// creating patients records
export const createPatientService = async (data) => {
  const existingMedNo = await findPatientByMedical_record_number(data.medical_record_number);
  if (existingMedNo && existingMedNo.length > 0) {
    throw new Error("Medical Record Number already exists");
  }

  const existingEmail = await findPatientByEmail(data.email);
  if (existingEmail && existingEmail.length > 0) {
    throw new Error("Patient already exists with this email");
  }

  return await insertPatient(data);
};

export const getPatientsService = async () => {
  return await findAllPatients();
};

export const getPatientByIdService = async (id) => {
  return await findPatientById(id);
};

export const updatePatientService = async (id, data) => {
  const patient = await findPatientById(id);
  if (!patient) throw new Error("Patient not found");

  // remove old image if new one uploaded
  if (data.profile_image && patient.profile_image) {
    const oldPath = `uploads/patients/${patient.profile_image}`;
    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
  }

  return await updatePatientById(id, data);
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