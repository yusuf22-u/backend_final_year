import multer from "multer";
import fs from "fs";
import path from "path";

const uploadPath = "uploads/profile_images";

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // check if files exist
    if (!fs.existsSync(uploadPath)) {
      // create folder
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
   filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + ext;;

    cb(null, uniqueName);
  }
});
// filtering the image types

const fileFilter = (req, file, cb) => {
  const allowTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("only image are allow eg:jpg jpeg png"), false);
  }
};

export const upload = multer({
  storage: fileStorage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});
