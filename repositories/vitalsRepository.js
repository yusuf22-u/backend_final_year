import db from "../config/db.js";

export const insertVital = async (data) => {
  const { patient_id, blood_pressure, heart_rate, temperature, recorded_at } = data;
  const [rows] = await db.query(
    `INSERT INTO vitals (patient_id, blood_pressure, heart_rate, temperature, recorded_at) 
     VALUES (?, ?, ?, ?, ?)`,
    [patient_id, blood_pressure, heart_rate, temperature, recorded_at]
  );
  return rows.insertId;
};

export const findAllVitals = async () => {
  const [rows] = await db.query(`SELECT * FROM vitals`);
  return rows;
};

export const findVitalsByPatientId = async (patient_id) => {
  const [rows] = await db.query(`SELECT * FROM vitals WHERE patient_id = ?`, [patient_id]);
  return rows;
};

export const updateVitalById = async (id, data) => {
  const { blood_pressure, heart_rate, temperature, recorded_at } = data;
  const [rows] = await db.query(
    `UPDATE vitals SET blood_pressure=?, heart_rate=?, temperature=?, recorded_at=? WHERE id=?`,
    [blood_pressure, heart_rate, temperature, recorded_at, id]
  );
  return rows;
};

export const deleteVitalById = async (id) => {
  const [rows] = await db.query(`DELETE FROM vitals WHERE id=?`, [id]);
  return rows;
};