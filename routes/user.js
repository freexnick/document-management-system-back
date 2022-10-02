import express from "express";
import { addUser, getUsers } from "../controllers/user.js";

const router = express.Router();

router.route("/").get(getUsers).post(addUser);

export { router };
