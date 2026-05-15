
import db from "../config/db.js";
const createAppointmentsTable = async () => {
  const sql = `CREATE TABLE IF NOT EXISTS appointments(
 id INT AUTO_INCREMENT PRIMARY KEY,
  patient_id INT NOT NULL,
  doctor_id INT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  type VARCHAR(100),
  location VARCHAR(100),
  notes TEXT,
  status ENUM('pending','approved','rejected','completed','cancelled')
    DEFAULT 'pending',
  approved_at TIMESTAMP NULL,
  approved_by INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (patient_id)
    REFERENCES patients(id)
    ON DELETE CASCADE,

  FOREIGN KEY (doctor_id)
    REFERENCES staff(id)
    ON DELETE SET NULL

)`;

  try {
  await db.query(sql);
  console.log("appointments table created successfully");
} catch (error) {
  console.log("appointments table creation failed", error);
}
};

export default createAppointmentsTable;