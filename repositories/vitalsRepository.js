import db from "../config/db.js";

/* CREATE */
export const insertVital = async (data) => {
  const {
    patient_id,
    blood_pressure,
    heart_rate,
    temperature,
    weight,
    respiratory_rate,
    oxygen_saturation,
    recorded_at,
  } = data;

  const [rows] = await db.query(
    `INSERT INTO vitals
    (
      patient_id,
      blood_pressure,
      heart_rate,
      temperature,
      weight,
      respiratory_rate,
      oxygen_saturation,
      recorded_at
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      patient_id,
      blood_pressure,
      heart_rate,
      temperature,
      weight,
      respiratory_rate,
      oxygen_saturation,
      recorded_at,
    ]
  );

  return rows.insertId;
};


/* GET ALL */
export const findAllVitals = async () => {
  const [rows] = await db.query(`
    SELECT v.*, p.first_name, p.last_name
    FROM vitals v
    JOIN patients p ON p.id = v.patient_id
    ORDER BY recorded_at DESC
  `);

  return rows;
};


/* GET BY PATIENT */
export const findVitalsByPatientId = async (patient_id) => {
  const [rows] = await db.query(
    `SELECT *
     FROM vitals
     WHERE patient_id = ?
     ORDER BY recorded_at DESC`,
    [patient_id]
  );

  return rows;
};


/* UPDATE */
export const updateVitalById = async (id, data) => {
  const {
    blood_pressure,
    heart_rate,
    temperature,
    weight,
    respiratory_rate,
    oxygen_saturation,
    recorded_at,
  } = data;

  const [rows] = await db.query(
    `UPDATE vitals
     SET
      blood_pressure=?,
      heart_rate=?,
      temperature=?,
      weight=?,
      respiratory_rate=?,
      oxygen_saturation=?,
      recorded_at=?
     WHERE id=?`,
    [
      blood_pressure,
      heart_rate,
      temperature,
      weight,
      respiratory_rate,
      oxygen_saturation,
      recorded_at,
      id,
    ]
  );

  return rows;
};


/* DELETE */
export const deleteVitalById = async (id) => {
  const [rows] = await db.query(
    `DELETE FROM vitals WHERE id=?`,
    [id]
  );

  return rows;
};