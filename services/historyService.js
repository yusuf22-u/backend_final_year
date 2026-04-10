import {insertHistory, findAllHistory,findHistoryByPatientId,updateHistoryById,deleteHistoryById} from "../repositories/historyRepository.js";

export const createHistory = async (data) => {
  return await insertHistory(data);
};

export const getAllHistory = async () => {
  return await findAllHistory();
};

export const getHistoryByPatient = async (patient_id) => {
  return await findHistoryByPatientId(patient_id);
};

export const updateHistory = async (id, data) => {
  return await updateHistoryById(id, data);
};

export const deleteHistory = async (id) => {
  return await deleteHistoryById(id);
};