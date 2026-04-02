import express from "express";
import { patientUpload } from "../middlewares/patientUpload.js"; // new upload
import {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient
} from "../controllers/patientsController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

// Create patient with profile image
router.post(
  "/",
  verifyToken,
  patientUpload.single("profile_image"), 
  createPatient
);

// Update patient with optional profile image
router.put(
  "/:id",
  verifyToken,
  patientUpload.single("profile_image"), 
  updatePatient
);

// Other routes
router.get("/", verifyToken, getAllPatients);
router.get("/:id", verifyToken, getPatientById);
router.delete("/:id", verifyToken, deletePatient);

export { router as patientRouter };