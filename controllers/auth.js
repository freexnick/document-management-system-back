import { User } from "../models/User.js";

export const auth = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const validatePassword = await user.comparePasswords(password);
  if (validatePassword) req.session.user = user.name;
  res.status(200).json({ status: 200, message: "Success" });
};
