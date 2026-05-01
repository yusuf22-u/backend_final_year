import db from "../config/db.js";
export const getAllStaff = async () => {
  const [rows] = await db.query(`
    SELECT 
      s.id,
      s.user_id,
      u.first_name,
      u.last_name,
      u.email,
      u.phone,
      s.role,
      s.department,
      s.specialty,
      s.schedule,
      s.rating,
      s.status,
      s.license_no,
      COUNT(p.id) AS total_patients

    FROM staff s

    JOIN users u ON u.id = s.user_id

    LEFT JOIN patients p 
      ON p.assigned_staff_id = s.id

    GROUP BY s.id
    ORDER BY s.id DESC
  `);

  return rows;
};

export const getStaffById = async (id) => {
  const [rows] = await db.query(`
    SELECT 
      s.*,
      u.first_name,
      u.last_name,
      u.email,
      u.phone
    FROM staff s
    JOIN users u ON u.id = s.user_id
    WHERE s.id = ?
  `, [id]);

  return rows[0];
};

// repositories/staffRepository.js

export const insertUser = async (conn, data) => {
  const [result] = await conn.query(`
    INSERT INTO users (first_name, last_name, email, phone, password, role)
    VALUES (?, ?, ?, ?, ?, ?)
  `, [
    data.first_name,
    data.last_name,
    data.email,
    data.phone,
    data.password,
    data.role
  ]);

  return result.insertId;
};

export const insertStaff = async (conn, data) => {
  const [result] = await conn.query(`
    INSERT INTO staff 
    (user_id, role, department, specialty, schedule, rating, status, license_no, address)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    data.user_id,
    data.role,
    data.department,
    data.specialty,
    data.schedule,
    data.rating,
    data.status,
    data.license_no,
    data.address
  ]);

  return result.insertId;
};

export const updateStaff = async(id,data)=>{
 await db.query(`
 UPDATE staff SET
 full_name=?,
 email=?,
 phone=?,
 role=?,
 department=?,
 specialty=?,
 schedule=?,
 rating=?,
 status=?,
 license_no=?,
 address=?
 WHERE id=?
 `,[
   data.full_name,
   data.email,
   data.phone,
   data.role,
   data.department,
   data.specialty,
   data.schedule,
   data.rating,
   data.status,
  data.license_no,
   data.address,
   id
 ]);
};

export const deleteStaff = async(id)=>{
 await db.query("DELETE FROM staff WHERE id=?", [id]);
};
export const findStaffByUserId = async (userId) => {
  const [rows] = await db.query(
    "SELECT * FROM staff WHERE user_id = ?",
    [userId]
  );

  return rows[0]; // return single staff
};