import db from "../config/db.js";

const createUserTable = async () => {
  const sql = `CREATE TABLE IF NOT EXISTS users(
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin','doctor','nurse','pharmacist','lab_technician','patient') NOT NULL,
  status ENUM('active','inactive','pending') DEFAULT 'active',
  profile_image VARCHAR(255),
  email_verified BOOLEAN DEFAULT FALSE,
  last_login TIMESTAMP NULL DEFAULT NULL,
  is_deleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

)`;

  try {
  await db.query(sql);
  console.log("User table created successfully");
} catch (error) {
  console.log("User table creation failed", error);
}
};

export default createUserTable;