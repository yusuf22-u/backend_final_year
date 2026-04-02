import multer from "multer";
import { upload } from "./upload.js";

export const uploadSingleImage = (req, res, next) => {

  const handler = upload.single("profile_image");

  handler(req, res, function (err) {

    if (err) {

      // 🔴 Handle Multer errors (like file size)
      if (err instanceof multer.MulterError) {

        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({
            message: "File too large. Max size is 2MB"
          });
        }

        return res.status(400).json({
          message: err.message
        });
      }

      // 🔴 Handle custom errors (fileFilter)
      return res.status(400).json({
        message: err.message
      });
    }

    // ✅ No error → continue
    next();
  });
};