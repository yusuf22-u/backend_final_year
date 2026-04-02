import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js";
import router from "./routers/user.route.js";
import { patientRouter } from "./routers/patientRoutes.js";

import cors from "cors";
import  createUserTable from "./models/user.model.js"
dotenv.config();

const app = express();

app.use(express.json());
app.use("/uploads", express.static("uploads/profile_images"));
app.use("/uploads", express.static("uploads/patient_profile"));
app.use(cors({
    // origin: 'https://hr-management-sys-app.netlify.app',
    origin:'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

// creating table
await createUserTable()


app.use("/api/users", router);
app.use("/api/patients", patientRouter);

app.listen(process.env.PORT, () =>
  console.log(`server runing on port ${process.env.PORT}`),
);
