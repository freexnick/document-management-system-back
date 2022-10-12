import express from "express";
import { getPublicDocuments } from "../controllers/document.js";

const router = express.Router();

router.route("/").get(getPublicDocuments);

export { router };
