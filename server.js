import express from "express";
import { router as authRouter } from "./routes/user.js";
import cors from "cors";

const PORT = process.env.PORT || 8000;
const HOST = "localhost";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Test</h1>");
});

app.use("/login", authRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on ${HOST}:${PORT}...`);
});
