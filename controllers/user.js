import { User } from "../models/User.js";

const addUser = async (req, res) => {
  await User.create(req.body);
  res.status(200).json({ status: 200, message: "Success" });
};

const getUsers = async (req, res) => {
  const result = await User.find();
  res.status(200).json(result);
};

export { addUser, getUsers };
