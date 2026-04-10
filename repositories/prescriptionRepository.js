import db from "../config/db.js";

export const insertPrescription = async (data) => {
  const { patient_id, medicine_name, dosage, start_date, end_date, notes } = data;
  const [rows] = await db.query(
    `INSERT INTO prescriptions (patient_id, medicine_name, dosage, start_date, end_date, notes) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [patient_id, medicine_name, dosage, start_date, end_date, notes]
  );
  return rows.insertId;
};

export const findAllPrescriptions = async () => {
  const [rows] = await db.query(`SELECT * FROM prescriptions`);
  return rows;
};

export const findPrescriptionsByPatientId = async (patient_id) => {
  const [rows] = await db.query(`SELECT * FROM prescriptions WHERE patient_id = ?`, [patient_id]);
  return rows;
};

export const updatePrescriptionById = async (id, data) => {
  const { medicine_name, dosage, start_date, end_date, notes } = data;
  const [rows] = await db.query(
    `UPDATE prescriptions SET medicine_name=?, dosage=?, start_date=?, end_date=?, notes=? WHERE id=?`,
    [medicine_name, dosage, start_date, end_date, notes, id]
  );
  return rows;
};

export const deletePrescriptionById = async (id) => {
  const [rows] = await db.query(`DELETE FROM prescriptions WHERE id=?`, [id]);
  return rows;
};