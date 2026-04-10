import { insertPrescription, findAllPrescriptions, findPrescriptionsByPatientId, updatePrescriptionById, deletePrescriptionById } from "../repositories/prescriptionRepository.js";

export const createPrescription = async (data) => {
    return await insertPrescription(data);
};

export const getAllPrescriptions = async () => {
    return await findAllPrescriptions();
};

export const getPrescriptionsByPatient = async (patient_id) => {
    return await findPrescriptionsByPatientId(patient_id);
};

export const updatePrescription = async (id, data) => {
    return await updatePrescriptionById(id, data);
};

export const deletePrescription = async (id) => {
    return await deletePrescriptionById(id);
};