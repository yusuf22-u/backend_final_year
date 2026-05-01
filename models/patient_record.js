
import db from "../config/db.js";

const createStaffTable = async () => {
    const sql = `CREATE TABLE IF NOT EXISTS patient_records(
  id INT AUTO_INCREMENT PRIMARY KEY,
  patient_id INT NOT NULL,
  doctor_id INT NULL,
  condition_state TEXT,
  status ENUM('stable','critical','monitoring','improving') DEFAULT 'stable',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
  FOREIGN KEY (doctor_id) REFERENCES staff(id) ON DELETE SET NULL
)`;

    try {
        await db.query(sql);
        console.log(" patient_records table created successfully");
    } catch (error) {
        console.log(" patient_records table creation failed", error);
    }
};

export default createStaffTable;

// ALTER TABLE beds
// ADD CONSTRAINT check_patient_status
// CHECK (
//   (status = 'occupied' AND patient_id IS NOT NULL)
//   OR
//   (status != 'occupied' AND patient_id IS NULL)
// );