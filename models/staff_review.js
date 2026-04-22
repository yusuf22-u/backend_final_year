


import db from "../config/db.js";

const createStaff_reviewsTable = async () => {
    const sql = `CREATE TABLE IF NOT EXISTS staff_reviews(
 id INT AUTO_INCREMENT PRIMARY KEY,
 patient_id INT,
 staff_id INT,
 rating INT CHECK (rating BETWEEN 1 AND 5),
 comment TEXT,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

    try {
        await db.query(sql);
        console.log(" staff_reviews table created successfully");
    } catch (error) {
        console.log(" staff_review table creation failed", error);
    }
};

export default createStaff_reviewsTable;

