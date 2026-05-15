
import { signUpService, loginService, getUsersForPatientService, getuserProfileService } from "../services/auth.user.js";
import { findUserById, updateUserImage } from "../repositories/auth.user.js";
import { deleteFile } from "../helpers/deleteFile.js";
import db from "../config/db.js";
export const createAccount = async (req, res) => {
  const { firstName, lastName, phone, email, password } = req.body;

  if (!firstName || !lastName || !email || !password || !phone) {
    if (req.file) deleteFile(req.file.path);
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const image = req.file?.filename || null;

    const { userId } = await signUpService({
      first_name: firstName,
      last_name: lastName,
      phone,
      email: email.toLowerCase().trim(),
      password,
      profile_image: image,
      role: "patient"
    });

    return res.status(201).json({
      message: "User created successfully",
      userId
    });

  } catch (error) {
    if (req.file) deleteFile(req.file.path);

    if (error.message === "Email already exists") {
      return res.status(409).json({ message: error.message });
    }

    return res.status(500).json({ message: "Server error" });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  try {
    const token = await loginService({ email, password });

    return res.status(200).json({
      message: "Login successful",
      token
    });

  } catch (error) {
    if (error.message === "Invalid credentials") {
      return res.status(401).json({ message: error.message });
    }

    return res.status(500).json({ message: "Server error" });
  }
};
export const updateProfileImage = async (req, res) => {
  try {
    const userId = req.user.userId;

    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const user = await findUserById(userId);

    if (!user.length) {
      deleteFile(req.file.path);
      return res.status(404).json({ message: "User not found" });
    }

    const oldImage = user[0].profile_image;

    await updateUserImage(userId, req.file.filename);

    if (oldImage) {
      deleteFile(`uploads/profile_images/${oldImage}`);
    }

    return res.status(200).json({
      message: "Profile updated successfully"
    });

  } catch (error) {
    if (req.file) deleteFile(req.file.path);
    return res.status(500).json({ message: "Server error" });
  }
};
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const [rows] = await db.query(`
      SELECT 
        id,
        first_name,
        last_name,
        email,
        role,
        profile_image
      FROM users
      WHERE id = ?
    `, [userId]);

    if (!rows.length) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(rows[0]);
    console.log("row", rows)

  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
export const getUsersForPatient = async (req, res) => {
  try {
    const users = await getUsersForPatientService();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
};
export const getuserProfileDetail = async (req, res) => {
  const userId = req.user.userId;
  try {
    const result = await getuserProfileService(userId)
    if (result.length <= 0) {
      return res.status(404).json({ message: "users not found" })

    }
    return res.status(200).json(result)
  } catch (error) {
    console.error("server err", error)
  }
}