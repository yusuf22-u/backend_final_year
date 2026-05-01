// controllers/patientRecord.controller.js
import { assignDoctorService } from "../services/patientRecord.service.js";

export const assignDoctor = async (req, res) => {
  try {
    const { patient_id, doctor_id, condition_state, status, notes } = req.body;

    await assignDoctorService({
      patient_id,
      doctor_id,
      condition_state,
      status,
      notes,
    });

    return res.status(201).json({
      message: "Doctor assigned successfully",
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};