import db from "../config/db.js";

export const insertPatient = async (data) => {
  const { user_id, first_name, last_name, email, phone, address, date_of_birth, profile_image } = data;
  const [rows] = await db.query(
    `INSERT INTO patients 
      (user_id, first_name, last_name, email, phone, address, date_of_birth, profile_image) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [user_id, first_name, last_name, email, phone, address, date_of_birth, profile_image]
  );
  return rows.insertId;
};

export const findAllPatients = async () => {
  const [rows] = await db.query(`SELECT * FROM patients`);
  return rows;
};

export const findPatientById = async (id) => {
  const [rows] = await db.query(`SELECT * FROM patients WHERE id = ?`, [id]);
  return rows[0];
};

export const updatePatientById = async (id, data) => {
  const { first_name, last_name, email, phone, address, date_of_birth, profile_image } = data;
  const [rows] = await db.query(
    `UPDATE patients SET first_name=?, last_name=?, email=?, phone=?, address=?, date_of_birth=?, profile_image=? WHERE id=?`,
    [first_name, last_name, email, phone, address, date_of_birth, profile_image, id]
  );
  return rows;
};

export const deletePatientById = async (id) => {
  const [rows] = await db.query(`DELETE FROM patients WHERE id=?`, [id]);
  return rows;
};