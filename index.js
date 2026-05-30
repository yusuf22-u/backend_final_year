import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js";
import router from "./routers/user.route.js";
import { patientRouter } from "./routers/patientRoutes.js";
import {prescriptionRouter} from './routers/Prescription.js'
import { vitalsRouter } from "./routers/vitals.js";
import { historyRouter } from "./routers/history.js";
import { bedsRouter } from "./routers/bedRoutes.js";
import { staffRouter } from "./routers/staffRoutes.js";
import { appointmentRoutes } from "./routers/appointmentRoutes.js";
import { patientRecordRoute } from "./routers/patient_recordRoute.js";
import { notificationRouter } from "./routers/notificationRoutes.js";
import cors from "cors";
import  createUserTable from "./models/user.model.js"
import createVitalsTable from "./models/vitalsModel.js";
import createPrescriptionsTable from "./models/prescriptionModel.js";
import createHistoryTable from "./models/historyModel.js";
import createAppointmentsTable from "./models/appointmentModel.js"
import createPatientsTable from "./models/patients.js";
import createStaffTable from "./models/staffModel.js";
import createBedsTable from "./models/bedsModel.js";
import createNotificationsTable from "./models/notificationmodel.js";

// import createVitalsTable from "./models/vitalsModel.js";
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
await createUserTable();
await createStaffTable();
await createPatientsTable();

await createAppointmentsTable();
await createBedsTable();
await createNotificationsTable();
await createHistoryTable();
await createPrescriptionsTable();
await createVitalsTable();


app.use("/api/users", router);
app.use("/api/patients", patientRouter);
app.use("/api/presription", prescriptionRouter);
app.use("/api/vitals", vitalsRouter );
app.use("/api/beds", bedsRouter);
app.use("/api/staff", staffRouter);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/patient-records", patientRecordRoute);
app.use("/api/notifications",notificationRouter)

app.listen(process.env.PORT, () =>
  console.log(`server runing on port ${process.env.PORT}`),
);
