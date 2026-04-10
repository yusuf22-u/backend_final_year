import db from "../config/db.js";

export const insertHistory = async (data) => {
  const { patient_id, event_type, description, event_date } = data;
  const [rows] = await db.query(
    `INSERT INTO history (patient_id, event_type, description, event_date) 
     VALUES (?, ?, ?, ?)`,
    [patient_id, event_type, description, event_date]
  );
  return rows.insertId;
};

export const findAllHistory = async () => {
  const [rows] = await db.query(`SELECT * FROM history`);
  return rows;
};

export const findHistoryByPatientId = async (patient_id) => {
  const [rows] = await db.query(`SELECT * FROM history WHERE patient_id = ?`, [patient_id]);
  return rows;
};

export const updateHistoryById = async (id, data) => {
  const { event_type, description, event_date } = data;
  const [rows] = await db.query(
    `UPDATE history SET event_type=?, description=?, event_date=? WHERE id=?`,
    [event_type, description, event_date, id]
  );
  return rows;
};

export const deleteHistoryById = async (id) => {
  const [rows] = await db.query(`DELETE FROM history WHERE id=?`, [id]);
  return rows;
};