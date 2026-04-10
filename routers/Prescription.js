import express from "express";
import { createPrescription, getAllPrescriptions, getPrescriptionsByPatient, updatePrescription, deletePrescription } from "../controllers/prescriptionController.js";

const router = express.Router();

router.post("/", createPrescription);
router.get("/", getAllPrescriptions);
router.get("/:patientId", getPrescriptionsByPatient);
router.put("/:id", updatePrescription);
router.delete("/:id", deletePrescription);

export { router as prescriptionRouter };