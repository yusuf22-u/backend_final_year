import express from "express";
import { getAllNotification } from "../controllers/notificationController.js";
import { verifyToken } from "../middlewares/verifyToken.js"
import { isAdmin, isDoctor, isPatient } from "../middlewares/roles.js"

const router = express.Router();


router.get("/", verifyToken, isAdmin, getAllNotification);


export { router as notificationRouter };