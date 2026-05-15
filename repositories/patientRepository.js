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
      u.profile_image,

      pa.condition_state,
      pa.status,
      pa.notes,

      s.id AS doctor_id,
      su.first_name AS doctor_first_name,
      su.last_name AS doctor_last_name,
      s.department,
      s.specialty

    FROM patients p
    JOIN users u ON u.id = p.user_id

    LEFT JOIN patient_assignments pa 
      ON pa.patient_id = p.id 
      AND pa.is_active = true

    LEFT JOIN staff s 
      ON s.id = pa.doctor_id

    LEFT JOIN users su 
      ON su.id = s.user_id

    WHERE u.role = 'patient'
    ORDER BY p.id DESC
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