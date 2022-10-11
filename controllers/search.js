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
  try {
    await User.find(data);
    res.status(200).json(result);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e });
  }
};

const searchDocument = async (req, res) => {
  const reg = new RegExp(req.params.id, "i");
  try {
    await Document.find({ name: reg });
    res.status(200).json(result);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e });
  }
};

export { searchUser, searchDocument };
