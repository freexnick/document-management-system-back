import express from "express";
import { auth } from "../controllers/auth.js";

const router = express.Router();

router.route("/").post(auth);

export { router };
