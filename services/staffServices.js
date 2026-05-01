// services/staffService.js
import db from "../config/db.js";
import { insertUser, insertStaff } from "../repositories/staffRepository.js";

export const createStaffService = async (data) => {
  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();

    // 1. Create user
    const userId = await insertUser(conn, {
      ...data,
      password: "defaultpassword"
    });

    // 2. Create staff
    const staffId = await insertStaff(conn, {
      ...data,
      user_id: userId
    });

    await conn.commit();

    return { userId, staffId };

  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};