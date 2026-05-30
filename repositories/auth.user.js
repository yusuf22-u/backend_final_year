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
export const userProfileRepo = async (userId) => {
  const [rows] = await db.query(`
    SELECT 
      u.id AS user_id,
      u.first_name,
      u.last_name,
      u.email,
      u.phone,
      u.profile_image,
      u.role AS user_role,
      u.status AS user_status,
      u.last_login,
      u.created_at,

      s.id AS staff_id,
      s.role AS staff_role,
      s.department,
      s.specialty,
      s.schedule,
      s.rating,
      s.status AS staff_status,
      s.license_no,
      s.address AS staff_address
      

    FROM users u

    LEFT JOIN staff s 
      ON s.user_id = u.id

    WHERE u.id = ?
      AND u.is_deleted = FALSE
  `, [userId]);

  return rows[0];
};

export const getAdminUser = async () => {
  const [rows] = await db.query(`
    SELECT id
    FROM users
    WHERE role='admin'
    LIMIT 1
  `);

  return rows[0];
};
export const findPatientByUserId = async (userId) => {
  const [rows] = await db.query(`
    SELECT
      p.*,
      u.first_name,
      u.last_name,
      u.email,
      u.phone,
      u.profile_image
    FROM patients p
    JOIN users u ON u.id = p.user_id
    WHERE p.user_id = ?
  `, [userId]);

  return rows[0];
};