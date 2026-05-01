
import { findStaffByUserId } from "../repositories/staffRepository.js";

import {
  createAppointmentService,
  getPendingAppointmentsService,
  approveAppointmentService,
  rejectAppointmentService,
  getDoctorAppointmentsService,
  getPatientAppointmentsService,
  getDetailForAppointmentService
} from "../services/appointmentService.js";

export const createAppointment = async (req, res) => {
    const userId=req.user.userId
    console.log("userid",userId)
  try {
    await createAppointmentService(userId, req.body);
    res.json({ message: "Appointment requested" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.error("server",err)
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
    const staff = await findStaffByUserId(req.user.userId);

    if (!staff) {
      return res.status(400).json({ message: "Doctor not found" });
    }

    await approveAppointmentService(req.params.id, staff.id);

    res.json({ message: "Appointment approved" });

  } catch (err) {
    res.status(400).json({ error: err.message });
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
export const getPatientAppointments = async (req, res) => {
    const userId=req.user.userId
  try {
    const data = await getPatientAppointmentsService(userId);
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