import db from "../config/db.js";

export const findUserByEmail = async (email) => {
  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows;
};


// create users
export const createUser = async ({
  firstName,
  lastName,
  phone,
  email,
  password,
  profile_image
}) => {
  const [result] = await db.query(
    "INSERT INTO users (firstName, lastName, phone, email, password, profile_image) VALUES(?,?,?,?,?,?)",
    [firstName, lastName, phone, email, password, profile_image],
  );
  return result;
 
};
// update users profile-image

export const updateUserImage = async (image, userId) => {
  const [rows] = await db.query(
    "UPDATE users SET profile_image = ? WHERE id = ?",
    [image, userId]
  );
  return rows;
};

//  finding user by id
export const getUserById = async (userId) => {
  const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [userId]);
  return rows;
};
