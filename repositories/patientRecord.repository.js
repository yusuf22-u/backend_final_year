// repositories/patientRecord.repository.js
import db from "../config/db.js";

export const assignDoctorRepo = async (data) => {
  const { patient_id, doctor_id, condition_state, status, notes } = data;

  const [result] = await db.query(
    `INSERT INTO patient_records 
    (patient_id, doctor_id, condition_state, status, notes)
    VALUES (?, ?, ?, ?, ?)`,
    [patient_id, doctor_id, condition_state, status, notes]
  );

  return result;
};