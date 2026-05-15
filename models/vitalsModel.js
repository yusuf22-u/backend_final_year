
import db from "../config/db.js";

const createVitalsTable = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS vitals (
      id INT AUTO_INCREMENT PRIMARY KEY,
      
      patient_id INT NOT NULL,

      blood_pressure VARCHAR(20) NOT NULL,
      heart_rate INT NOT NULL,
      temperature DECIMAL(4,1) NOT NULL,
      weight DECIMAL(5,2) NOT NULL,
      respiratory_rate INT NOT NULL,
      oxygen_saturation INT NOT NULL,

      recorded_at DATETIME NOT NULL,

      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
      ON UPDATE CURRENT_TIMESTAMP,

      FOREIGN KEY (patient_id)
      REFERENCES patients(id)
      ON DELETE CASCADE
    )
  `;

  try {
  await db.query(sql);
  console.log("vitals table created successfully");
} catch (error) {
  console.log("vitals table creation failed", error);
}
};

export default createVitalsTable;