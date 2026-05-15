import express from "express";
import { createAccount,login,getProfile,getUsersForPatient,getuserProfileDetail} from "../controllers/user.controller.js";
import {upload} from "../middlewares/upload.js"
import { uploadSingleImage  } from "../middlewares/uploadWrapper.js";
import {verifyToken} from "../middlewares/verifyToken.js";
import { isAdmin } from "../middlewares/roles.js";


const router= express.Router()
router.post(
  "/register",
  uploadSingleImage,
  createAccount
);
router.post("/login",login);
router.get("/profile", verifyToken, getProfile);
// router.get("/profile", verifyToken, getProfile);
router.get("/", verifyToken,isAdmin, getUsersForPatient);
router.get("/my-account", verifyToken, getuserProfileDetail);

export default router;
