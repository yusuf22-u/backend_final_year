import express from "express";

import {createVital,getAllVitals,getVitalsByPatient,updateVital,deleteVital} from "../controllers/vitalController.js"
const router = express.Router();

router.post("/", createVital);
router.get("/", getAllVitals);
router.get("/:patientId", getVitalsByPatient);
router.put("/:id", updateVital);
router.delete("/:id", deleteVital);

export { router as vitalsRouter };