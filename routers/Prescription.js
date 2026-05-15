import express from "express";
import {
  createPrescription,
  getAllPrescriptions,
  getPrescriptionsByPatient,
  updatePrescription,
  deletePrescription
} from "../controllers/prescriptionController.js";

import { verifyToken } from "../middlewares/verifyToken.js";
import { isDoctor } from "../middlewares/roles.js";

const router = express.Router();

// create new prescription
router.post(
  "/",
  verifyToken,
  isDoctor,
  createPrescription
);

// get all prescriptions
router.get(
  "/",
  verifyToken,
  isDoctor,
  getAllPrescriptions
);

// get prescriptions by patient
router.get(
  "/patient/:patientId",
  verifyToken,
  getPrescriptionsByPatient
);

// update prescription
router.put(
  "/:id",
  verifyToken,
  isDoctor,
  updatePrescription
);

// delete prescription
router.delete(
  "/:id",
  verifyToken,
  isDoctor,
  deletePrescription
);

export { router as prescriptionRouter };