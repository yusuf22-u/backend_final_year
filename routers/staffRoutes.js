import express from "express";
import {
 getStaff,
 getStaffById,
 createStaff,
 updateStaff,
 removeStaff
} from "../controllers/staffController.js";
import {verifyToken} from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/",verifyToken, getStaff);
router.get("/:id",verifyToken, getStaffById);
router.post("/",verifyToken, createStaff);
router.put("/:id",verifyToken, updateStaff);
router.delete("/:id",verifyToken, removeStaff);

export { router as staffRouter };