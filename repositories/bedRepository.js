import db from "../config/db.js";

export const getAllBeds = async () => {
  const [rows] = await db.query(`SELECT beds.*, patients.last_name, patients.first_name AS patient_name FROM beds
  LEFT JOIN patients ON beds.patient_id = patients.id`);
  return rows;
};

// Get single bed
export const getBedById = async (id) => {
  const [rows] = await db.query("SELECT * FROM beds WHERE id = ?", [id]);
  return rows[0];
};

// Create bed
export const createBedModel = async ({ bed_number, ward, status }) => {
  const [result] = await db.query(
    "INSERT INTO beds (bed_number, ward, status) VALUES (?, ?, ?)",
    [bed_number, ward, status || "available"]
  );

  return result.insertId;
};

// Update bed
export const updateBed = async (id, data) => {
  const { bed_number, ward, status } = data;

  await db.query(
    "UPDATE beds SET bed_number=?, ward=?, status=? WHERE id=?",
    [bed_number, ward, status, id]
  );
};

// Delete bed
export const deleteBed = async (id) => {
  await db.query("DELETE FROM beds WHERE id=?", [id]);
};

// Assign patient to bed
export const assignBedRepo = async (bedId, patientId, assignedAt) => {
  await db.query(
    `UPDATE beds
     SET patient_id=?,
         status='occupied',
         assigned_at=?
     WHERE id=?`,
    [patientId, assignedAt, bedId]
  );
};

// Release bed
export const releaseBedRepo = async (bedId) => {
  await db.query(
    "UPDATE beds SET patient_id=NULL, status='cleaning' WHERE id=?",
    [bedId]
  );
};

// get bed my number
export const getBedByBedNumber = async (bed_number) => {
  const [rows] = await db.query("SELECT * FROM beds WHERE bed_number = ?", [bed_number]);
  return rows[0];
};

// Ready bed
export const reSheduleBedRepo = async (bedId) => {
  await db.query(
    `UPDATE beds
     SET patient_id=NULL,
         status='available',
         assigned_at=NULL
     WHERE id=?`,
    [bedId]
  );
};
