import express from "express";
import { auth } from "../controllers/auth.js";

const router = express.Router();

router.route("/").post((req, res) => {
  auth(req, res);
});

export { router };
