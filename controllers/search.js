import { Document } from "../models/Document.js";
import { User } from "../models/User.js";

const searchUser = async (req, res) => {
  const reg = new RegExp(req.params.id, "i");
  let data = {};
  if (req.params.id.includes("@")) {
    data = { email: { $regex: reg } };
  } else {
    data = { name: { $regex: reg } };
  }
  const result = await User.find(data);
  res.status(200).json(result);
};

const searchDocument = async (req, res) => {
  const reg = new RegExp(req.params.id, "i");
  const result = await Document.find({ name: reg });
  res.status(200).json(result);
};

export { searchUser, searchDocument };
