import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// Set up storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify upload directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = uuidv4() + path.extname(file.originalname); // Generate a unique filename
    cb(null, uniqueSuffix); // Give the file a unique name
  },
});

// File upload setup for single and multiple files
const uploadFields = multer({
  storage,
});

export { uploadFields };
