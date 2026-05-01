
import db from "../config/db.js";

const createStaffTable = async () => {
    const sql = `CREATE TABLE IF NOT EXISTS staff(
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL UNIQUE,
  role ENUM('Doctor','Nurse','Pharmacist','Lab Technician') NOT NULL,
  department VARCHAR(100),
  specialty VARCHAR(100),
  schedule VARCHAR(100),
  rating DECIMAL(2,1) DEFAULT 5.0,
  status ENUM('Active','Busy','Leave','Inactive') DEFAULT 'Active',
  license_no VARCHAR(100),
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)`;

    try {
        await db.query(sql);
        console.log(" staff table created successfully");
    } catch (error) {
        console.log(" staff table creation failed", error);
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