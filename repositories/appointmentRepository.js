// repositories/appointment.repository.js

import db from "../config/db.js";

export const createAppointmentRepo = async (data) => {
  const { patient_id, date, time, type, notes } = data;

  const [result] = await db.query(
    `INSERT INTO appointments 
    (patient_id, appointment_date, appointment_time, type, notes)
    VALUES (?, ?, ?, ?, ?)`,
    [patient_id, date, time, type, notes]
  );

  return result;
};



export const approveAppointmentRepo = async (id, doctor_id) => {
  const [result] = await db.query(
    `UPDATE appointments 
     SET status='approved', doctor_id=? 
     WHERE id=?`,
    [doctor_id, id]
  );
  return result;
};

export const rejectAppointmentRepo = async (id) => {
  const [result] = await db.query(
    `UPDATE appointments 
     SET status='rejected' 
     WHERE id=?`,
    [id]
  );
  return result;
};

export const getDoctorAppointmentsRepo = async (doctor_id) => {
  const [rows] = await db.query(`
    SELECT 
      a.*,
      u.first_name,
      u.last_name
    FROM appointments a
    JOIN patients p ON p.id = a.patient_id
    JOIN users u ON u.id = p.user_id
    WHERE a.doctor_id=? AND a.status='approved'
  `, [doctor_id]);

  return rows;
};

// add in appointment.repository.js

export const getPatientAppointmentsRepo = async (patient_id) => {
  const [rows] = await db.query(`
    SELECT 
      a.*,
      du.first_name AS doctor_first_name,
      du.last_name AS doctor_last_name
    FROM appointments a
    LEFT JOIN staff s ON s.id = a.doctor_id
    LEFT JOIN users du ON du.id = s.user_id
    WHERE a.patient_id=?
    ORDER BY a.created_at DESC
  `, [patient_id]);

  return rows;
};
// get appointment detail for admin

export const getDetailForAppointmentRepo = async () => {
  const [rows] = await db.query(`
    SELECT 
      a.id,
      a.appointment_date,
      a.appointment_time,
      a.type,
      a.notes,
      a.status,

      -- patient info
      pu.first_name AS patient_first_name,
      pu.last_name AS patient_last_name,
      p.address AS patient_address,

      -- doctor info
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
  `);
  return rows;
};
