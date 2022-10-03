import express from "express";
import {
  addUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/user.js";

const router = express.Router();

router.route("/").get(getUsers).post(addUser);

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

export { router };
