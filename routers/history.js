import express from "express";
import { createHistory, getAllHistory, getHistoryByPatient, updateHistory, deleteHistory } from "../controllers/historyController.js"
const router = express.Router();

router.post("/", createHistory);
router.get("/", getAllHistory);
router.get("/:patientId", getHistoryByPatient);
router.put("/:id", updateHistory);
router.delete("/:id", deleteHistory);

export { router as historyRouter };