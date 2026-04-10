import { insertVital, findAllVitals, findVitalsByPatientId, updateVitalById, deleteVitalById } from "../repositories/vitalsRepository.js";

export const createVital = async (data) => {
  return await insertVital(data);
};

export const getAllVitals = async () => {
  return await findAllVitals();
};

export const getVitalsByPatient = async (patient_id) => {
  return await findVitalsByPatientId(patient_id);
};

export const updateVital = async (id, data) => {
  return await updateVitalById(id, data);
};

export const deleteVital = async (id) => {
  return await deleteVitalById(id);
};