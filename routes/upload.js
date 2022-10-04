import express from "express";
import * as multer from "multer";

const STORAGE = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer.default({
  storage: STORAGE,
  limits: { fieldSize: 25 * 1024 * 1024 },
});

const router = express.Router();

router.route("/");

router
  .route("/:id")
  .post(upload.single("file"), (req, res) => console.log(req.file, req.params));

export { router };
