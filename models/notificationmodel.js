
import db from "../config/db.js";
const createNotificationsTable = async () => {
  const sql = `CREATE TABLE IF NOT EXISTS notifications(
 id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(255),
  message TEXT,
  type VARCHAR(50) DEFAULT 'appointment',
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE


)`;

  try {
  await db.query(sql);
  console.log("notifications table created successfully");
} catch (error) {
  console.log("notifications table creation failed", error);
}
};

export default createNotificationsTable;