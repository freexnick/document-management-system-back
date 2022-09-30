import express from "express";
import { auth } from "../controllers/auth.js";

const router = express.Router();

router.route("/").get((req, res) => {
  res.send("<h1>asdasdasd</h1>");
});

export { router };
