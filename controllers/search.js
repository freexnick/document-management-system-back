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
    const result = await User.find(data);
    if (result) res.status(200).json(result);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e });
  }
};

const searchDocument = async (req, res) => {
  const reg = new RegExp(req.params.id, "i");
  try {
    const result = await Document.find({ name: reg });
    if (result) res.status(200).json(result);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e });
  }
};

export { searchUser, searchDocument };
