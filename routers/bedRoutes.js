import express from "express";
import {
  getBeds,
  getBed,
  createBed,
  updateBed,
  deleteBed,
  assignBed,
  releaseBed,
  reSchudelBed
} from "../controllers/bedController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/",  getBeds);
router.get("/:id",verifyToken, getBed);
router.post("/",verifyToken, createBed);
router.put("/:id",verifyToken, updateBed);
router.delete("/:id",verifyToken, deleteBed);

// Special actions
router.put("/:id/assign",verifyToken, assignBed);
router.put("/:id/release",verifyToken, releaseBed);
router.put("/:id/readybed",verifyToken, reSchudelBed);


export { router as bedsRouter };