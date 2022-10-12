import { User } from "../models/User.js";

const addUser = async (req, res) => {
  try {
    await User.create(req.body);
    res.status(201).json({ status: 201, message: "Success" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e });
  }
};

const getUsers = async (req, res) => {
  if (req.session.user?.role !== "admin") return getUser(req, res);
  try {
    const result = await User.find();
    res.status(200).json(result);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e });
  }
};

const getUser = async (req, res) => {
  try {
    const result = await User.find({ _id: req.session?.user?._id });
    res.status(200).json(result);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e });
  }
};

const updateUser = async (req, res) => {
  try {
    const result = await User.findOneAndUpdate(req.body.email, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(result);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findOneAndDelete(req.body.email);
    res.status(200).json({ status: 200, message: "Sucess" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e });
  }
};

export { addUser, getUser, getUsers, updateUser, deleteUser };
