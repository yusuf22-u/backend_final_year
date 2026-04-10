
import db from "../config/db.js";

const createPrescriptionsTable = async () => {
  const sql = `CREATE TABLE IF NOT EXISTS prescriptions(
     id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    medicine_name VARCHAR(255) NOT NULL,
    dosage VARCHAR(100),
    start_date DATE,
    end_date DATE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
)`;

  try {
  await db.query(sql);
  console.log("prescriptions table created successfully");
} catch (error) {
  console.log("vitals table creation failed", error);
}
};

export default  createPrescriptionsTable;