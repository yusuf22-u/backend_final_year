
import db from "../config/db.js";

const createPrescriptionsTable = async () => {
  const sql = `CREATE TABLE IF NOT EXISTS prescriptions(
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    drug VARCHAR(255) NOT NULL,
    dose VARCHAR(100) NOT NULL,
    frequency VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    prescribed_by VARCHAR(255) NOT NULL,
    status ENUM('active', 'completed', 'discontinued') DEFAULT 'active',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (patient_id) REFERENCES patients(id)
    ON DELETE CASCADE

)`;

  try {
  await db.query(sql);
  console.log("prescriptions table created successfully");
} catch (error) {
  console.log("prescriptions table creation failed", error);
}
};

export default  createPrescriptionsTable;