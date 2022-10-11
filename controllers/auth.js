import { User } from "../models/User.js";

const auth = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const validatePassword = await user?.comparePasswords(password);
    if (validatePassword) {
      req.session.user = user?._id;
      res.status(200).json(user);
    } else {
      res.status(401).json({ status: 401, message: "invalid credentials" });
    }
  } catch (e) {
    return res.status(400).json({ status: 400, message: e });
  }
};

const checkAuth = async (req, res, next) =>
  req.session.user?.length > 2 ? next() : res.redirect("/login");

const logout = async (req, res) => {
  delete req.session?.user;
  res.status(200).json({ status: 200, message: "Success" });
};

export { auth, checkAuth, logout };
