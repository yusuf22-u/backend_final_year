import {
  insertVital,
  findAllVitals,
  findVitalsByPatientId,
  updateVitalById,
  deleteVitalById
} from "../repositories/vitalsRepository.js";

export const createVital = async (data) => await insertVital(data);

export const getAllVitals = async () => await findAllVitals();

export const getVitalsByPatient = async (patient_id) =>
  await findVitalsByPatientId(patient_id);

export const updateVital = async (id, data) =>
  await updateVitalById(id, data);

export const deleteVital = async (id) =>
  await deleteVitalById(id);