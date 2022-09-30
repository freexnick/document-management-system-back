export const auth = (req, res) => {
  const { email, password } = req.body;
  res.status(200).json({ user: { email, password } });
};
