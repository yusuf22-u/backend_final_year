import db from "../config/db.js";

export const insertPatient = async (data) => {
  const {
    user_id,
    gender,
    date_of_birth,
    medical_record_number,
    insurance,
    address,
    assigned_staff_id
  } = data;

  const [result] = await db.query(
    `INSERT INTO patients 
    (user_id, gender, date_of_birth, medical_record_number, insurance, address, assigned_staff_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      user_id,
      gender,
      date_of_birth,
      medical_record_number,
      insurance,
      address,
      assigned_staff_id || null
    ]
  );

  return result.insertId;
};

export const findAllPatients = async () => {
  const [rows] = await db.query(`
    SELECT 
      p.*,
      u.first_name,
      u.last_name,
      u.email,
      u.phone,
      u.profile_image
    FROM patients p
    JOIN users u ON u.id = p.user_id WHERE role="patient"
  `);

  return rows;
};
// find patients by medicalnunber
export const findPatientByMedical_record_number = async (mrn) => {
  const [rows] = await db.query(
    `SELECT * FROM patients WHERE medical_record_number = ?`,
    [mrn]
  );
  return rows[0];
};
// find patients by email
export const findPatientByEmail = async (email) => {
  const [rows] = await db.query(`SELECT * FROM patients WHERE  email = ?`, [email]);
  return rows[0];
};

export const findPatientById = async (id) => {
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
    WHERE p.id = ?
  `, [id]);

  return rows[0];
};
export const updatePatientById = async (id, data) => {
  const {
    user_id,
    gender,
    date_of_birth,
    medical_record_number,
    insurance,
    address,
    assigned_staff_id
  } = data;

  const [result] = await db.query(
    `UPDATE patients SET
      user_id=?,
      gender=?,
      date_of_birth=?,
      medical_record_number=?,
      insurance=?,
      address=?,
      assigned_staff_id=?
     WHERE id=?`,
    [
      user_id,
      gender,
      date_of_birth,
      medical_record_number,
      insurance,
      address,
      assigned_staff_id || null,
      id
    ]
  );

  return result;
};
export const deletePatientById = async (id) => {
  const [rows] = await db.query(`DELETE FROM patients WHERE id=?`, [id]);
  return rows;
};
export const findPatientByUserId = async (userId) => {
  const [rows] = await db.query(
    "SELECT * FROM patients WHERE user_id = ?",
    [userId]
  );

  return rows[0];
};
export const updatePatientByUserId = async (userId, data) => {
  const {
    gender,
    date_of_birth,
    medical_record_number,
    insurance,
    address
  } = data;

  const [result] = await db.query(
    `UPDATE patients SET
      gender=?,
      date_of_birth=?,
      medical_record_number=?,
      insurance=?,
      address=?
     WHERE user_id=?`,
    [
      gender,
      date_of_birth,
      medical_record_number,
      insurance,
      address,
      userId
    ]
  );

  return result;
};