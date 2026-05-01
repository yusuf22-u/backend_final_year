
import db from "../config/db.js";

const createPatientsTable = async () => {
  const sql = `CREATE TABLE IF NOT EXISTS patients(
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL UNIQUE,
  gender ENUM('male', 'female', 'other'),
  date_of_birth DATE,
  medical_record_number VARCHAR(50) UNIQUE,
  insurance VARCHAR(100),
  address VARCHAR(255),
  assigned_staff_id INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

  FOREIGN KEY (assigned_staff_id) REFERENCES staff(id)
    ON DELETE SET NULL
    ON UPDATE CASCADE

)`;

  try {
  await db.query(sql);
  console.log("patients table created successfully");
} catch (error) {
  console.log("patients table creation failed", error);
}
};

export default createPatientsTable;