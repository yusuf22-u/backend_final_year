import express from "express";
import {
  createVital,
  getAllVitals,
  getVitalByPatient,
  updateVital,
  deleteVital,
  getMedicalRecord
} from "../controllers/vitalController.js";
import {isDoctor} from "../middlewares/roles.js"
import {verifyToken} from "../middlewares/verifyToken.js"

const router = express.Router();

router.post("/",verifyToken,isDoctor, createVital);
router.get("/",verifyToken,isDoctor, getAllVitals);
router.get("/medical/:patientId", verifyToken, isDoctor, getMedicalRecord);
router.put("/:id",verifyToken,isDoctor, updateVital);
router.delete("/:id",verifyToken,isDoctor, deleteVital);

export { router as vitalsRouter };