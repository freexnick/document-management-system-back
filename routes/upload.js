import express from "express";
import * as multer from "multer";
import { uploadFile } from "../controllers/document.js";

const STORAGE = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    file.originalname = Buffer.from(file.originalname, "latin1").toString(
      "utf8"
    );
    cb(null, `{${Date.now()}-${req.params.id}-${file.originalname}`);
  },
});

const upload = multer.default({
  storage: STORAGE,
  limits: { fieldSize: 25 * 1024 * 1024 },
});

const router = express.Router();

router.route("/").get();

router
  .route("/:id")
  .post(upload.single("file"), (req, res) => uploadFile(req, res));

export { router };
