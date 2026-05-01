// routes/appointment.routes.js

import express from "express";
import {
  createAppointment,
  getPendingAppointments,
  approveAppointment,
  rejectAppointment,
  getDoctorAppointments,
  getPatientAppointments,
  getAppointmentsDetail
} from "../controllers/appointmentController.js";

import { verifyToken } from "../middlewares/verifyToken.js";
import {isAdmin,isDoctor,isPatient} from "../middlewares/roles.js"

const router = express.Router();


//patient
router.post("/", verifyToken, isPatient, createAppointment);
router.get("/patient", verifyToken, isPatient, getPatientAppointments);

//admin
router.get("/pending", verifyToken, isAdmin, getPendingAppointments);
router.put("/approve/:id", verifyToken, isAdmin, approveAppointment);
router.put("/reject/:id", verifyToken, isAdmin, rejectAppointment);
router.get("/view", verifyToken, isAdmin, getAppointmentsDetail);

//doctor
router.get("/doctor", verifyToken, isDoctor, getDoctorAppointments);
export {router as appointmentRoutes} ;