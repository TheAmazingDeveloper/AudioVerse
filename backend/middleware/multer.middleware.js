import multer from "multer";
import path from "path";
import __dirname from "../utils/dirname.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "public", "temp"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const multerFileUpload = multer({ storage: storage });

export default multerFileUpload;
