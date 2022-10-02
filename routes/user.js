import express from "express";
import { addUser } from "../controllers/user.js";

const router = express.Router();

router.route("/").post(addUser);

export { router };
