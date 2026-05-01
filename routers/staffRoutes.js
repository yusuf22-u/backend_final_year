import express from "express";
import { createStaff } from "../controllers/staffController.js";
import {verifyToken} from "../middlewares/verifyToken.js";

const router = express.Router();
router.post("/create",createStaff)
// router.get("/",verifyToken, getStaff);
// router.get("/:id",verifyToken, getStaffById);
// router.post("/",verifyToken, createStaff);
// router.put("/:id",verifyToken, updateStaff);
// router.delete("/:id",verifyToken, removeStaff);

export { router as staffRouter };