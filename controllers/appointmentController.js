
import { findStaffByUserId } from "../repositories/staffRepository.js";

import {
  createAppointmentService,
  getPatientAppointmentsService,
  approveAppointmentService
} from "../services/appointmentService.js";
import {
  findPatientByUserId
} from "../repositories/patientRepository.js";

export const createAppointment = async (req, res) => {
  try {
    // get logged in user id
    const userId = req.user.userId;

    // find patient record
    const patient = await findPatientByUserId(userId);

    if (!patient) {
      return res.status(404).json({
        message: "Patient not found"
      });
    }

    const result =
      await createAppointmentService(
        patient.id,
        req.body
      );

    res.status(201).json(result);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

export const getPatientAppointments = async (req, res) => {
  try {
    const patientId = req.user.patient_id;

    const rows =
      await getPatientAppointmentsService(patientId);

    res.json(rows);

  } catch (err) {
    res.status(500).json(err);
  }
};

export const getPendingAppointments = async (req, res) => {
  try {
    const data = await getPendingAppointmentsService();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const approveAppointment = async (req, res) => {
  try {
    const adminId = req.user.id;

    const { doctor_id, location } = req.body;

    await approveAppointmentService(
      req.params.id,
      doctor_id,
      location,
      adminId
    );

    res.json({
      message: "approved"
    });

  } catch (err) {
    res.status(500).json(err);
  }
};

export const rejectAppointment = async (req, res) => {
  try {
    await rejectAppointmentService(req.params.id);
    res.json({ message: "Appointment rejected" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getDoctorAppointments = async (req, res) => {
  try {
    const data = await getDoctorAppointmentsService(req.user);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// get all detail for appointment
export const getAppointmentsDetail = async (req, res) => {
  try {
    const data = await  getDetailForAppointmentService();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};