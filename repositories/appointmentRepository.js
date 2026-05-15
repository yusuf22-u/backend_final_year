import db from "../config/db.js";

/*
========================
CREATE APPOINTMENT
========================
*/
export const createAppointmentRepo = async (patientId, data) => {
  const sql = `
    INSERT INTO appointments
    (
      patient_id,
      appointment_date,
      appointment_time,
      type,
      notes
    )
    VALUES (?, ?, ?, ?, ?)
  `;

  const [result] = await db.query(sql, [
    patientId,
    data.date,
    data.time,
    data.type,
    data.notes,
  ]);

  return result;
};


/*
========================
APPROVE APPOINTMENT
========================
*/
export const approveAppointmentRepo = async (
  id,
  doctorId,
  location,
  adminId
) => {
  await db.query(
    `
    UPDATE appointments
    SET
      doctor_id=?,
      location=?,
      status='approved',
      approved_by=?,
      approved_at=NOW()
    WHERE id=?
    `,
    [doctorId, location, adminId, id]
  );

  const [rows] = await db.query(
    `
    SELECT p.user_id
    FROM appointments a
    JOIN patients p ON p.id = a.patient_id
    WHERE a.id=?
    `,
    [id]
  );

  return rows[0].user_id;
};


/*
========================
REJECT APPOINTMENT
========================
*/
export const rejectAppointmentRepo = async (id) => {
  await db.query(
    `
    UPDATE appointments
    SET status='rejected'
    WHERE id=?
    `,
    [id]
  );

  const [rows] = await db.query(
    `
    SELECT p.user_id
    FROM appointments a
    JOIN patients p ON p.id = a.patient_id
    WHERE a.id=?
    `,
    [id]
  );

  return rows[0].user_id;
};


/*
========================
PATIENT APPOINTMENTS
========================
*/
export const getPatientAppointmentsRepo = async (patientId) => {
  const [rows] = await db.query(
    `
    SELECT
      a.*,
      du.first_name AS doctor_first_name,
      du.last_name AS doctor_last_name
    FROM appointments a
    LEFT JOIN staff s ON s.id = a.doctor_id
    LEFT JOIN users du ON du.id = s.user_id
    WHERE a.patient_id=?
    ORDER BY a.created_at DESC
    `,
    [patientId]
  );

  return rows;
};


/*
========================
DOCTOR APPOINTMENTS
========================
*/
export const getDoctorAppointmentsRepo = async (doctor_id) => {
  const [rows] = await db.query(
    `
    SELECT
      a.*,
      u.first_name,
      u.last_name
    FROM appointments a
    JOIN patients p ON p.id = a.patient_id
    JOIN users u ON u.id = p.user_id
    WHERE a.doctor_id=? 
    AND a.status='approved'
    `,
    [doctor_id]
  );

  return rows;
};


/*
========================
PENDING APPOINTMENTS
========================
*/
export const getPendingAppointmentsRepo = async () => {
  const [rows] = await db.query(`
    SELECT
      a.*,
      u.first_name,
      u.last_name
    FROM appointments a
    JOIN patients p ON p.id = a.patient_id
    JOIN users u ON u.id = p.user_id
    WHERE a.status='pending'
    ORDER BY a.created_at DESC
  `);

  return rows;
};


/*
========================
ADMIN APPOINTMENT DETAILS
========================
*/
export const getDetailForAppointmentRepo = async () => {
  const [rows] = await db.query(`
    SELECT
      a.id,
      a.appointment_date,
      a.appointment_time,
      a.type,
      a.notes,
      a.location,
      a.status,

      pu.first_name AS patient_first_name,
      pu.last_name AS patient_last_name,
      p.address AS patient_address,

      du.first_name AS doctor_first_name,
      du.last_name AS doctor_last_name,
      s.department,
      s.specialty

    FROM appointments a

    JOIN patients p ON p.id = a.patient_id
    JOIN users pu ON pu.id = p.user_id

    LEFT JOIN staff s ON s.id = a.doctor_id
    LEFT JOIN users du ON du.id = s.user_id

    ORDER BY a.created_at DESC
  `);

  return rows;
};