import express from "express";
import {
  createVital,
  getAllVitals,
  getVitalByPatient,
  updateVital,
  deleteVital,
  getMedicalRecord,
  getMyMedicalRecord
} from "../controllers/vitalController.js";
import {isDoctor, isPatient} from "../middlewares/roles.js"
import {verifyToken} from "../middlewares/verifyToken.js"

const router = express.Router();

router.post("/",verifyToken,isDoctor, createVital);
router.get("/",verifyToken,isDoctor, getAllVitals);
router.get("/medical/:patientId", verifyToken, isDoctor, getMedicalRecord);
router.put("/:id",verifyToken,isDoctor, updateVital);
router.delete("/:id",verifyToken,isDoctor, deleteVital);
router.get("/my-medical-record", verifyToken,isPatient, getMyMedicalRecord);

export { router as vitalsRouter };