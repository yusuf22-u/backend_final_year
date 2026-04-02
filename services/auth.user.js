import { findUserByEmail, createUser } from "../repositories/auth.user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();

export const signUpServices = async ({
  firstName,
  lastName,
  phone,
  email,
  password,
  profile_image,
}) => {
  // check the email exits
  const rows = await findUserByEmail(email);
  if (rows.length > 0) throw new Error("Email already exists");

  // hash password
  const hashPassword = await bcrypt.hash(password, 10);
  // create user
  const result = await createUser({
    firstName,
    lastName,
    phone,
    email,
    password:hashPassword,
    profile_image
  }
   
  );
  return { userId:result.insertId};
};

  // login
export const loginServices=async({email,password})=>{
  const normalizedEmail = email.toLowerCase().trim();

  const rows = await findUserByEmail(normalizedEmail);

  if (rows.length <= 0) throw new Error("Invalid credentials");
  // compare the password
  const user= await rows[0]
  const isPasswordValid= await bcrypt.compare(password, user.password)
  if(!isPasswordValid) throw new Error("Invalid credentials");

  const token = jwt.sign(
   { userId: user.id, email: user.email, role:user.role },
  process.env.JWT_SECRET_KEY,
   { expiresIn: '1h' }
 
)
return token
  }

  
