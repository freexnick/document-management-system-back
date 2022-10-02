import { User } from "../models/User.js";

export const addUser = async (req, res) => {
  await User.create(req.body);
  res.status(200).json({ status: 200, message: "Success" });
};
