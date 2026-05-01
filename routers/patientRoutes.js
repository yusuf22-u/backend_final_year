import express from "express";
import { patientUpload } from "../middlewares/patientUpload.js"; // new upload
import {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient,
  updatePatientByAdmin,
  updateMyPatientProfile
} from "../controllers/patientsController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import {isAdmin, isPatient} from "../middlewares/roles.js"

const router = express.Router();

// Create patient with profile image
router.post(
  "/",
  verifyToken,
  isAdmin,
  patientUpload.single("profile_image"), 
  createPatient
);

// Update patient with optional profile image
router.put(
  "/:id",
  verifyToken,
  isAdmin,
  patientUpload.single("profile_image"), 
  updatePatient
);

// Other routes
router.get("/", verifyToken,isAdmin, getAllPatients);
router.get("/:id", verifyToken,isPatient, getPatientById);
router.delete("/:id", verifyToken,isAdmin, deletePatient);
// user completes profile
router.post("/patients/me", verifyToken,isPatient, createPatient);
router.put("/admin/:id", verifyToken, isAdmin, updatePatientByAdmin);

// 👤 Patient update own profile
router.put("/me", verifyToken, isPatient, updateMyPatientProfile);

export { router as patientRouter };