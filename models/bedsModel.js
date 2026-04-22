import db from "../config/db.js";

const createBedsTable = async () => {
  const sql = `CREATE TABLE IF NOT EXISTS beds(
  id INT AUTO_INCREMENT PRIMARY KEY,
  bed_number VARCHAR(50) UNIQUE NOT NULL,
  ward VARCHAR(50) NOT NULL,
  status ENUM('available', 'occupied', 'cleaning', 'maintenance') DEFAULT 'available',
  patient_id INT NULL,
  assigned_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE SET NULL
)`;

  try {
  await db.query(sql);
  console.log("beds table created successfully");
} catch (error) {
  console.log("beds table creation failed", error);
}
};

export default createBedsTable;

// ALTER TABLE beds
// ADD CONSTRAINT check_patient_status
// CHECK (
//   (status = 'occupied' AND patient_id IS NOT NULL)
//   OR
//   (status != 'occupied' AND patient_id IS NULL)
// );