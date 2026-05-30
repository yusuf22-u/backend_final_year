// routes/appointment.routes.js
import express from "express";
import {
  createAppointment,
  getPatientAppointments,
  approveAppointment,
  getAppointmentsDetail,
  rejectAppointment,
  getPatientAppointmentsByID,
  DoctorsAppointments
} from "../controllers/appointmentController.js";
import {verifyToken} from "../middlewares/verifyToken.js";
import {isDoctor,isAdmin} from "../middlewares/roles.js"
const router = express.Router();

router.post("/", verifyToken, createAppointment);

router.get("/patient", verifyToken, getPatientAppointments);

router.put("/:id/approve", verifyToken, approveAppointment);
router.put("/:id/reject", verifyToken, rejectAppointment);
router.get("/patient_appointment", verifyToken,isAdmin, getAppointmentsDetail);
router.get("/:patientId", verifyToken,isDoctor, getPatientAppointmentsByID);
router.get("/doctor-appointments", verifyToken,isDoctor, DoctorsAppointments);


export {router as appointmentRoutes} ;