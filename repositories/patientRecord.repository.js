// repositories/patientRecord.repository.js
import db from "../config/db.js";

export const assignDoctorRepo = async (data) => {
  const { patient_id, doctor_id, condition_state, status, notes } = data;

  // 1. deactivate old assignment
  await db.query(
    `UPDATE patient_assignments
     SET is_active = false
     WHERE patient_id = ?`,
    [patient_id]
  );

  // 2. insert new assignment
  const [result] = await db.query(
    `INSERT INTO patient_assignments 
    (patient_id, doctor_id, condition_state, status, notes, is_active)
    VALUES (?, ?, ?, ?, ?, true)`,
    [patient_id, doctor_id, condition_state, status, notes]
  );

  return result;
};