import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { router as authRouter } from "./routes/login.js";
import { router as userRouter } from "./routes/user.js";
import { connectDB } from "./db/connect.js";

const PORT = process.env.PORT || 8000;
const HOST = "localhost";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Document Management System</h1>");
});

app.use("/login", authRouter);
app.use("/user", userRouter);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server is listening on ${HOST}:${PORT}...`);
    });
  } catch (e) {
    console.log(e);
  }
};
start();
