
import db from "../config/db.js";

const createHistoryTable = async () => {
  const sql = `CREATE TABLE IF NOT EXISTS history(
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    event_type VARCHAR(100),
    description TEXT,
    event_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
)`;

  try {
  await db.query(sql);
  console.log("history table created successfully");
} catch (error) {
  console.log("history table creation failed", error);
}
};

export default createHistoryTable;