
import db from "../config/db.js";

const createStaffTable = async () => {
    const sql = `CREATE TABLE IF NOT EXISTS patient_records(
  
  id INT AUTO_INCREMENT PRIMARY KEY,
  patient_id INT NOT NULL,
  doctor_id INT NOT NULL,

  condition_state VARCHAR(255),
  status ENUM('stable', 'critical', 'monitoring', 'improving') DEFAULT 'stable',
  notes TEXT,

  is_active BOOLEAN DEFAULT TRUE,

  assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (patient_id) REFERENCES patients(id),
  FOREIGN KEY (doctor_id) REFERENCES staff(id)
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