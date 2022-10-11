import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import * as exSession from "express-session";
import * as cookieParser from "cookie-parser";
import { router as authRouter } from "./routes/login.js";
import { router as userRouter } from "./routes/user.js";
import { router as documentRouter } from "./routes/document.js";
import { router as uploadRouter } from "./routes/upload.js";
import { router as searchRouter } from "./routes/search.js";
import { connectDB } from "./db/connect.js";

const PORT = process.env.PORT || 8000;
const HOST = "localhost";

dotenv.config();

const app = express();

const sessionData = {
  secret: "documentmanagementsystem",
  cookie: {},
  proxy: true,
  resave: true,
  saveUninitialized: true,
};

app.use(exSession.default(sessionData));

app.use(cookieParser.default());

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Document Management System</h1>");
});

app.use("/login", authRouter);
app.use("/user", userRouter);
app.use("/documents", documentRouter);
app.use("/upload", uploadRouter);
app.use("/search", searchRouter);

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
