// services/appointment.service.js

import {
    createAppointmentRepo,
    getPendingAppointmentsRepo,
    approveAppointmentRepo,
    rejectAppointmentRepo,
    getDoctorAppointmentsRepo,
    getPatientAppointmentsRepo,
    getDetailForAppointmentRepo
} from "../repositories/appointmentRepository.js";

import { findPatientByUserId } from "../repositories/patientRepository.js";

import { findStaffByUserId } from "../repositories/staffRepository.js";

export const createAppointmentService = async (userId, body) => {

  // 🔥 convert user → patient
  const patient = await findPatientByUserId(userId);

  if (!patient) {
    throw new Error("Patient profile not found");
  }

  return await createAppointmentRepo({
    patient_id: patient.id,
    ...body,
  });
};

export const getPendingAppointmentsService = async () => {
    return await getPendingAppointmentsRepo();
};

export const approveAppointmentService = async (id, doctor_id) => {
    if (!doctor_id) throw new Error("Doctor is required");

    return await approveAppointmentRepo(id, doctor_id);
};

export const rejectAppointmentService = async (id) => {
    return await rejectAppointmentRepo(id);
};



export const getDoctorAppointmentsService = async (user) => {
  const staff = await findStaffByUserId(user.userId);

  if (!staff) {
    throw new Error("Staff not found");
  }

  return await getDoctorAppointmentsRepo(staff.id);
};

export const getDetailForAppointmentService = async () => {
    return await getDetailForAppointmentRepo();
};
export const getPatientAppointmentsService = async (userId) => {
  const patient = await findPatientByUserId(userId);

  if (!patient) {
    throw new Error("Patient not found");
  }

  return await getPatientAppointmentsRepo(patient.id);
};