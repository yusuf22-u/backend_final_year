import db from "../config/db.js";

const createUserTable = async () => {
  const sql = `CREATE TABLE IF NOT EXISTS users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin','doctor','nurse','receptionist') NOT NULL DEFAULT 'receptionist',
    status ENUM('active','inactive','pending') NOT NULL DEFAULT 'active',
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