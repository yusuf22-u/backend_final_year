
import db from "../config/db.js";

const createVitalsTable = async () => {
  const sql = `CREATE TABLE IF NOT EXISTS vitals(
     id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    blood_pressure VARCHAR(20),
    heart_rate INT,
    temperature FLOAT,
    recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
)`;

  try {
  await db.query(sql);
  console.log("vitals table created successfully");
} catch (error) {
  console.log("vitals table creation failed", error);
}
};

export default createVitalsTable;