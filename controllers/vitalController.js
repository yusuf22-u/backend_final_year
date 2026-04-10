import * as VitalService from "../services/vitalService.js";

export const createVital = async (req, res) => {
  try {
    const id = await VitalService.createVital(req.body);
    res.status(201).json({ success: true, id });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllVitals = async (req, res) => {
  try {
    const vitals = await VitalService.getAllVitals();
    res.status(200).json({ success: true, data: vitals });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getVitalsByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const vitals = await VitalService.getVitalsByPatient(patientId);
    res.status(200).json({ success: true, data: vitals });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateVital = async (req, res) => {
  try {
    const { id } = req.params;
    await VitalService.updateVital(id, req.body);
    res.status(200).json({ success: true, message: "Vital updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteVital = async (req, res) => {
  try {
    const { id } = req.params;
    await VitalService.deleteVital(id);
    res.status(200).json({ success: true, message: "Vital deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};