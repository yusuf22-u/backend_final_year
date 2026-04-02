import db from "../config/db.js";
import { signUpServices,loginServices } from "../services/auth.user.js";
import {deleteFile} from "../helpers/deleteFile.js"
import {getUserById, updateUserImage} from "../repositories/auth.user.js"
import fs from "fs";
import path from "path";

export const createAccount = async (req, res) => {

  const { firstName, lastName, phone, email, password } = req.body;

  if (!firstName || !lastName || !email || !password || !phone) {

    // delete uploaded file if validation fails
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(400).json({ message: "All fields are required" });
  }

  try {

    const normalizedEmail = email.toLowerCase().trim();

    const image = req.file?.filename || null;

    const { userId } = await signUpServices({
      firstName,
      lastName,
      phone,
      email: normalizedEmail,
      password,
      profile_image: image,
    });

    return res.status(201).json({
      message: "User created successfully",
      userId
    });

  } catch (error) {

    // ❗ DELETE IMAGE if something fails
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }

    if (error.message === "Email already exists") {
      return res.status(409).json({ message: error.message });
    }

    console.error("Signup error:", error);

    return res.status(500).json({ message: "Server error" });
  }
};
export const login = async (req, res) => {
  const {email, password}=req.body;
  if(!email || !password){
    return res.status(400).json({message:"email and password required"})
  }
  try {
    // login services
    const result=await loginServices({email, password})
    return res.status(200).json({message:"login successfully",token:result})
  } catch (error) {
    if (error.message==="Invalid credentials") {
       return res.status(401).json({ message: error.message });
   }
    console.error("login error:", error);
    return res.status(500).json({ message: "Server error" });
  
  }
};

// update users profile picture
export const updateProfileImage = async (req, res) => {

  try {
    // const userId = req.params.id;
    const userId = req.user.id;

    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const newImage = req.file.filename;

    const userData = await getUserById(userId);

    if (!userData.length) {
      deleteFile(req.file.path);
      return res.status(404).json({ message: "User not found" });
    }

    const oldImage = userData[0].profile_image;

    // ✅ Update DB FIRST
    await updateUserImage(newImage, userId);

    // ✅ Delete old image AFTER successful update
    if (oldImage) {
      const oldPath = `uploads/profile_images/${oldImage}`;
      deleteFile(oldPath);
    }

    return res.status(200).json({
      message: "Profile image updated successfully"
    });

  } catch (error) {

    if (req.file) {
      deleteFile(req.file.path);
    }

    console.error("Update error:", error);

    return res.status(500).json({
      message: "Server error"
    });
  }
};
// get users data

  export const getProfile = async (req, res) => {

  try {

    // coming from token
    const userId = req.user.userId;
    

    const [rows] = await db.query(
      "SELECT id, firstName, lastName, email, role, profile_image FROM users WHERE id = ?",
      [userId]
    );

    if (!rows.length) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(rows[0]);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
