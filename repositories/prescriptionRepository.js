import db from "../config/db.js";

export const insertPrescription = async (data) => {
  const {
    patient_id,
    drug,
    dose,
    frequency,
    start_date,
    end_date,
    prescribed_by,
    status
  } = data;

  const [rows] = await db.query(
    `INSERT INTO prescriptions
    (patient_id, drug, dose, frequency, start_date, end_date, prescribed_by, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      patient_id,
      drug,
      dose,
      frequency,
      start_date,
      end_date,
      prescribed_by,
      status
    ]
  );

  return rows.insertId;
};

export const findAllPrescriptions = async () => {
  const [rows] = await db.query(`SELECT * FROM prescriptions`);
  return rows;
};

export const findPrescriptionsByPatientId = async (patient_id) => {
  const [rows] = await db.query(
    `SELECT * FROM prescriptions WHERE patient_id = ?`,
    [patient_id]
  );
  return rows;
};

export const updatePrescriptionById = async (id, data) => {
  const {
    drug,
    dose,
    frequency,
    start_date,
    end_date,
    prescribed_by,
    status
  } = data;

  const [rows] = await db.query(
    `UPDATE prescriptions
     SET drug=?,
         dose=?,
         frequency=?,
         start_date=?,
         end_date=?,
         prescribed_by=?,
         status=?
     WHERE id=?`,
    [
      drug,
      dose,
      frequency,
      start_date,
      end_date,
      prescribed_by,
      status,
      id
    ]
  );

  return rows;
};

export const deletePrescriptionById = async (id) => {
  const [rows] = await db.query(
    `DELETE FROM prescriptions WHERE id=?`,
    [id]
  );

  return rows;
};