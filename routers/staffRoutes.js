import express from "express";
import { createStaff,getAllStaff,getDoctorPatient } from "../controllers/staffController.js";
import {verifyToken} from "../middlewares/verifyToken.js";
import {isAdmin,isDoctor,isPatient} from "../middlewares/roles.js"
const router = express.Router();
router.post("/create",isAdmin,createStaff)
router.get("/",verifyToken,isAdmin, getAllStaff);
router.get("/assign-patients",verifyToken,isDoctor, getDoctorPatient);
// router.get("/:id",verifyToken, getStaffById);
// router.post("/",verifyToken, createStaff);
// router.put("/:id",verifyToken, updateStaff);
// router.delete("/:id",verifyToken, removeStaff);

export { router as staffRouter };