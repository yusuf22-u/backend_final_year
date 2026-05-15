import db from "../config/db.js";

export const createNotificationRepo = async (
  userId,
  title,
  message
) => {
  await db.query(
    `
    INSERT INTO notifications
    (
      user_id,
      title,
      message
    )
    VALUES (?, ?, ?)
    `,
    [userId, title, message]
  );
};