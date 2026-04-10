import * as PrescriptionService from "../services/prescriptionService.js";

export const createPrescription = async (req, res) => {
  try {
    const id = await PrescriptionService.createPrescription(req.body);
    res.status(201).json({ success: true, id });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllPrescriptions = async (req, res) => {
  try {
    const prescriptions = await PrescriptionService.getAllPrescriptions();
    res.status(200).json({ success: true, data: prescriptions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPrescriptionsByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const prescriptions = await PrescriptionService.getPrescriptionsByPatient(patientId);
    res.status(200).json({ success: true, data: prescriptions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updatePrescription = async (req, res) => {
  try {
    const { id } = req.params;
    await PrescriptionService.updatePrescription(id, req.body);
    res.status(200).json({ success: true, message: "Prescription updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deletePrescription = async (req, res) => {
  try {
    const { id } = req.params;
    await PrescriptionService.deletePrescription(id);
    res.status(200).json({ success: true, message: "Prescription deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};