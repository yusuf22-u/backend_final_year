
import db from "../config/db.js";

const createPatientsTable = async () => {
  const sql = `CREATE TABLE IF NOT EXISTS patients(
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    gender ENUM('male', 'female', 'other') DEFAULT NULL,
    date_of_birth DATE DEFAULT NULL,
    phone VARCHAR(20) DEFAULT NULL,
    email VARCHAR(100) DEFAULT NULL,
    address VARCHAR(255) DEFAULT NULL,
    medical_record_number VARCHAR(50) DEFAULT NULL UNIQUE,
    insurance VARCHAR(100) DEFAULT NULL,
    profile_image VARCHAR(255) DEFAULT NULL,
    assigned_staff_id INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (assigned_staff_id) REFERENCES staff(id)
)`;

  try {
  await db.query(sql);
  console.log("patients table created successfully");
} catch (error) {
  console.log("patients table creation failed", error);
}
};

export default createPatientsTable;