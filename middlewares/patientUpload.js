// middleware/patientUpload.js
import multer from "multer";
import fs from "fs";
import path from "path";

const patientUploadPath = "uploads/patient_profile";

const patientStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(patientUploadPath)) {
      fs.mkdirSync(patientUploadPath, { recursive: true });
    }
    cb(null, patientUploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + ext;
    cb(null, uniqueName);
  },
});

// Filter only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed (jpg, jpeg, png)"), false);
  }
};

export const patientUpload = multer({
  storage: patientStorage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});