
import db from "../config/db.js";

const createStaffTable = async () => {
    const sql = `CREATE TABLE IF NOT EXISTS staff(
  id INT AUTO_INCREMENT PRIMARY KEY,
 full_name VARCHAR(100),
 email VARCHAR(100) UNIQUE,
 phone VARCHAR(30),
 role ENUM('Doctor','Nurse','Pharmacist','Lab Technician'),
 department VARCHAR(100),
 specialty VARCHAR(100),
 schedule VARCHAR(100),
 rating DECIMAL(2,1) DEFAULT 5.0,
 status ENUM('Active','Busy','Leave','Inactive') DEFAULT 'Active',
 license_no VARCHAR(100) NULL,
 address TEXT NULL,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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