import express from "express";
import * as multer from "multer";
import { uploadFile } from "../controllers/document.js";
import { checkSpace } from "../controllers/user.js";

const STORAGE = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    file.originalname = Buffer.from(file.originalname, "latin1").toString(
      "utf8"
    );
    cb(null, `{${Date.now()}-${req.session?.user?._id}-${file.originalname}`);
  },
});

const upload = multer.default({
  storage: STORAGE,
  limits: { fileSize: 26214400 },
  fileFilter: checkSpace,
});

const router = express.Router();

const fileUpload = (req, res, next) => {
  const fu = upload.single("file");
  fu(req, res, (err) => {
    if (err) return res.status(500);
    if (req.body.error)
      return res
        .status(413)
        .json({ status: 413, message: "not enough space on drive" });
    next();
  });
};

router.route("/").post(fileUpload, (req, res) => uploadFile(req, res));

export { router };
