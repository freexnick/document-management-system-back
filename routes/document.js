import express from "express";
import {
  deleteDocument,
  getDocuments,
  getDocument,
} from "../controllers/document.js";

const router = express.Router();

router.route("/").get(getDocuments);

router.route("/:id").get(getDocument).delete(deleteDocument);

export { router };
