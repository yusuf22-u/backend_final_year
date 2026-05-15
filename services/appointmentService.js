import {
  createAppointmentRepo,
  getPatientAppointmentsRepo,
  approveAppointmentRepo,
  rejectAppointmentRepo,
  getDoctorAppointmentsRepo,
  getPendingAppointmentsRepo,
  getDetailForAppointmentRepo
} from "../repositories/appointmentRepository.js";

import {
  createNotificationRepo
} from "../repositories/notification.repo.js";

import {
  findStaffByUserId
} from "../repositories/staffRepository.js";
import { getAdminUser } from "../repositories/auth.user.js";

/*
========================
PATIENT CREATE
========================
*/
export const createAppointmentService = async (
  patientId,
  data
) => {
  const appointment =
    await createAppointmentRepo(patientId, data);
const admin = await getAdminUser();

await createNotificationRepo(
  admin.id,
  "New Appointment",
  "New patient appointment request"
);
  return appointment;
};


/*
========================
PATIENT LIST
========================
*/
export const getPatientAppointmentsService = (
  patientId
) => {
  return getPatientAppointmentsRepo(patientId);
};


/*
========================
ADMIN PENDING
========================
*/
export const getPendingAppointmentsService =
async () => {
  return await getPendingAppointmentsRepo();
};


/*
========================
ADMIN APPROVE
========================
*/
export const approveAppointmentService =
async (
  id,
  doctorId,
  location,
  adminId
) => {
  const patientUserId =
    await approveAppointmentRepo(
      id,
      doctorId,
      location,
      adminId
    );

  await createNotificationRepo(
    patientUserId,
    "Appointment Approved",
    "Your appointment has been approved"
  );
};


/*
========================
ADMIN REJECT
========================
*/
export const rejectAppointmentService =
async (id) => {
  const patientUserId =
    await rejectAppointmentRepo(id);

  await createNotificationRepo(
    patientUserId,
    "Appointment Rejected",
    "Your appointment was rejected"
  );
};


/*
========================
DOCTOR LIST
========================
*/
export const getDoctorAppointmentsService =
async (user) => {
  const staff =
    await findStaffByUserId(user.userId);

  if (!staff) {
    throw new Error("Staff not found");
  }

  return await getDoctorAppointmentsRepo(
    staff.id
  );
};


/*
========================
ADMIN DETAILS
========================
*/
export const getDetailForAppointmentService =
async () => {
  return await getDetailForAppointmentRepo();
};