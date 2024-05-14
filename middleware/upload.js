// middleware/upload.js

import multer from "multer";
import path from "path";

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination folder where the file will be saved
    cb(null, "./uploads"); // You can change './uploads' to your desired folder path
  },
  filename: function (req, file, cb) {
    // Set the file name to save as
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, path.extname(file.originalname));
  },
});

// Set up multer upload middleware
const upload = multer({ storage });

export default upload;
