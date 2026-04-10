import db from "../config/db.js";

export const insertPatient = async (data) => {
  const { first_name, last_name, email, phone, address, date_of_birth, profile_image, gender, insurance, medical_record_number } = data;
  const [rows] = await db.query(
    `INSERT INTO patients 
      (first_name, last_name, email, phone, address, date_of_birth, profile_image, gender,insurance, medical_record_number) 
     VALUES (?, ?, ?, ?, ?, ?, ?,?,?,?)`,
    [first_name, last_name, email, phone, address, date_of_birth, profile_image, gender, insurance, medical_record_number]
  );
  return rows.insertId;
};

export const findAllPatients = async () => {
  const [rows] = await db.query(`SELECT * FROM patients`);
  return rows;
};
// find patients by medicalnunber
export const findPatientByMedical_record_number = async (medical_record_number) => {
  const [rows] = await db.query(`SELECT * FROM patients WHERE  medical_record_number = ?`, [medical_record_number]);
  return rows[0];
};
// find patients by email
export const findPatientByEmail = async (email) => {
  const [rows] = await db.query(`SELECT * FROM patients WHERE  email = ?`, [email]);
  return rows[0];
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