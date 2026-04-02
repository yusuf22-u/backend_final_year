import express from "express";
import { createAccount,login,getProfile } from "../controllers/user.controller.js";
import {upload} from "../middlewares/upload.js"
import { uploadSingleImage  } from "../middlewares/uploadWrapper.js";
import {verifyToken} from "../middlewares/verifyToken.js";


const router= express.Router()
router.post(
  "/create",
  uploadSingleImage,
  createAccount
);
router.post("/login",login);
router.get("/profile", verifyToken, getProfile);

export default router;
