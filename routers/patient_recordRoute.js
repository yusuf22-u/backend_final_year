import express from "express";
import { assignDoctor } from "../controllers/patientRecord.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { isAdmin } from "../middlewares/roles.js";

const router = express.Router();

router.post("/assign-doctor", verifyToken, isAdmin, assignDoctor);

export {router as patientRecordRoute };
