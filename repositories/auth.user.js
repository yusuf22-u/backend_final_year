// repositories/userRepository.js
import db from "../config/db.js";

// find by email
export const findUserByEmail = async (email) => {
  const [rows] = await db.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );
  return rows;
};

// create user (used by signup OR staff/patient creation)
export const insertUser = async (conn, data) => {
  const [result] = await conn.query(`
    INSERT INTO users 
    (first_name, last_name, phone, email, password, role, profile_image)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `, [
    data.first_name,
    data.last_name,
    data.phone,
    data.email,
    data.password,
    data.role,
    data.profile_image
  ]);

  return result.insertId;
};

// get user by id
export const findUserById = async (userId) => {
  const [rows] = await db.query(
    "SELECT * FROM users WHERE id = ?",
    [userId]
  );
  return rows;
};

// update profile image
export const updateUserImage = async (userId, image) => {
  await db.query(
    "UPDATE users SET profile_image = ? WHERE id = ?",
    [image, userId]
  );
};

export const getUsersForPatient = async () => {
  const [rows] = await db.query(`
    SELECT id, first_name, last_name, email 
    FROM users 
    WHERE role = 'patient'
  `);
  return rows;
};