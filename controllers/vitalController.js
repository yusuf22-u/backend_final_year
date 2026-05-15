import * as VitalService from "../services/vitalService.js";
import { findPatientById } from "../repositories/patientRepository.js";
import { findVitalsByPatientId } from "../repositories/vitalsRepository.js";
import { findPrescriptionsByPatientId } from "../repositories/prescriptionRepository.js";

export const createVital = async (req, res) => {
  try {
    const {
      patient_id,
      blood_pressure,
      heart_rate,
      temperature,
      weight,
      respiratory_rate,
      oxygen_saturation,
      recorded_at,
    } = req.body;

    if (
      !patient_id ||
      !blood_pressure ||
      !heart_rate ||
      !temperature ||
      !weight ||
      !respiratory_rate ||
      !oxygen_saturation
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    const id = await VitalService.createVital(req.body);

    res.status(201).json({
      success: true,
      id,
      message: "Vital added successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getAllVitals = async (req, res) => {
  try {
    const vitals = await VitalService.getAllVitals();

    res.status(200).json({
      success: true,
      data: vitals,
    });
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    });
  }
};


export const getVitalByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;

    const vitals =
      await VitalService.getVitalsByPatient(patientId);

    res.status(200).json({
      success:true,
      data:vitals
    });

  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    });
  }
};


export const updateVital = async (req, res) => {
  try {
    const { id } = req.params;

    await VitalService.updateVital(id, req.body);

    res.status(200).json({
      success:true,
      message:"Vital updated successfully"
    });

  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    });
  }
};


export const deleteVital = async (req, res) => {
  try {
    const { id } = req.params;

    await VitalService.deleteVital(id);

    res.status(200).json({
      success:true,
      message:"Vital deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    });
  }
};
export const getMedicalRecord = async (req, res) => {
  try {
    const { patientId } = req.params;

    const patient = await findPatientById(patientId);
    const vitals = await findVitalsByPatientId(patientId);
    const prescriptions = await findPrescriptionsByPatientId(patientId);

    res.status(200).json({
      success: true,
      patient,
      vitals,
      prescriptions
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success:false,
      message:error.message
    });
  }
};