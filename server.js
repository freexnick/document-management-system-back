import express from "express";
import cors from "cors";
import proxy from "express-http-proxy";
import * as dotenv from "dotenv";
import * as exSession from "express-session";
import * as cookieParser from "cookie-parser";
import { router as authRouter } from "./routes/login.js";
import { router as userRouter } from "./routes/user.js";
import { router as documentRouter } from "./routes/document.js";
import { router as uploadRouter } from "./routes/upload.js";
import { router as searchRouter } from "./routes/search.js";
import { connectDB } from "./db/connect.js";
import { checkAuth } from "./controllers/auth.js";

const PORT = process.env.PORT || 8000;
const HOST = "localhost";

dotenv.config();

const app = express();

const sessionData = {
  secret: "documentmanagementsystem",
  cookie: {},
  proxy: true,
  resave: false,
  saveUninitialized: false,
  secure: false,
};

const corsOptions = {
  credentials: true,
  origin: ["http://localhost:8000", "http://localhost:1234"],
};

app.use(exSession.default(sessionData));

app.use(cookieParser.default());

app.use(cors(corsOptions));

app.use(express.json());

app.get("/", checkAuth, (req, res) => {
  res.send("<h1>Document Management System</h1>");
});

app.use("/api/v1/login", authRouter);
app.use("/api/v1/user", checkAuth, userRouter);
app.use("/api/v1/documents", checkAuth, documentRouter);
app.use("/api/v1/upload", checkAuth, uploadRouter);
app.use("/api/v1/search", checkAuth, searchRouter);

app.use(proxy("http://localhost:1234"));

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
