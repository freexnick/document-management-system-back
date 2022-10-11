import express from "express";
import { auth, logout } from "../controllers/auth.js";

const router = express.Router();

router.route("/").post(auth).delete(logout);

export { router };
