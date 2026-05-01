// services/patientRecord.service.js
import { assignDoctorRepo } from "../repositories/patientRecord.repository.js";

export const assignDoctorService = async (data) => {
  if (!data.patient_id || !data.doctor_id) {
    throw new Error("Patient and Doctor are required");
  }

  return await assignDoctorRepo(data);
};