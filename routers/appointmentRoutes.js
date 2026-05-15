// routes/appointment.routes.js
import express from "express";
import {
  createAppointment,
  getPatientAppointments,
  approveAppointment
} from "../controllers/appointmentController.js";
import {verifyToken} from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createAppointment);

router.get("/patient", verifyToken, getPatientAppointments);

router.put("/:id/approve", verifyToken, approveAppointment);


export {router as appointmentRoutes} ;