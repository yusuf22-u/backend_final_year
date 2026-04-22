import db from "../config/db.js";

export const getAllStaff = async () => {
 const [rows] = await db.query(`
 SELECT s.*,
 COUNT(p.id) AS total_patients
 FROM staff s
 LEFT JOIN patients p ON p.assigned_staff_id = s.id
 GROUP BY s.id
 ORDER BY s.id DESC
 `);

 return rows;
};

export const getStaffById = async(id)=>{
 const [rows] = await db.query("SELECT * FROM staff WHERE id=?", [id]);
 return rows[0];
};

export const createStaff = async(data)=>{
 const [result] = await db.query(`
 INSERT INTO staff
 (full_name,email,phone,role,department,specialty,schedule,rating,status,license_no,address)
 VALUES(?,?,?,?,?,?,?,?,?)
 `,[
   data.full_name,
   data.email,
   data.phone,
   data.role,
   data.department,
   data.specialty,
   data.schedule,
   data.rating || 5.0,
   data.status || "Active",
   data.license_no,
   data.address
 ]);

 return result;
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