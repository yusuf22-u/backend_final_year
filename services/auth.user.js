// services/authService.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import db from "../config/db.js";
import { findUserByEmail, insertUser, getUsersForPatient, userProfileRepo } from "../repositories/auth.user.js";

dotenv.config();

export const signUpService = async (data) => {
  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();

    // check email
    const existing = await findUserByEmail(data.email);
    if (existing.length > 0) {
      throw new Error("Email already exists");
    }

    // hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // create user
    const userId = await insertUser(conn, {
      ...data,
      password: hashedPassword,
      role: data.role || "patient"
    });

    await conn.commit();

    return { userId };

  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};
export const loginService = async ({ email, password }) => {
  const normalizedEmail = email.toLowerCase().trim();

  const rows = await findUserByEmail(normalizedEmail);
  if (rows.length === 0) throw new Error("Invalid credentials");

  const user = rows[0];

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error("Invalid credentials");

  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1h" }
  );

  return token;
};
export const getUsersForPatientService = async () => {
  return await getUsersForPatient()
}
export const getuserProfileService = async (userId) => {
  return await userProfileRepo(userId)
}