import { User } from "../models/User.js";

const addUser = async (req, res) => {
  await User.create(req.body);
  res.status(200).json({ status: 200, message: "Success" });
};

const getUsers = async (req, res) => {
  const result = await User.find();
  res.status(200).json(result);
};

const getUser = async (req, res) => {
  const { id: email } = req.params;
  const result = await User.findOne({ email });
  res.status(200).json(result);
};

const updateUser = async (req, res) => {
  const result = await User.findOneAndUpdate(req.body.email, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json(result);
};

const deleteUser = async (req, res) => {
  await User.findOneAndDelete(req.body.email);
  res.status(200).json({ status: 200, message: "Sucess" });
};

export { addUser, getUser, getUsers, updateUser, deleteUser };
