import express from "express";
import { getDocuments } from "../controllers/document.js";
import { searchUser, searchDocument } from "../controllers/search.js";
import { getUsers } from "../controllers/user.js";

const router = express.Router();

router.route("/").get(getUsers);
router.route("/user").get(getUsers);
router.route("/document").get(getDocuments);

router.route("/user/:id").get(searchUser);
router.route("/document/:id").get(searchDocument);

export { router };
