import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
import __dirname from "./utils/dirname.js";
import userRouter from "./routes/user.routes.js";

dotenv.config({ path: "./.env" });

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/static", express.static(path.join(__dirname, "public")));

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server listening on http://localhost:${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
})();

app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "OK",
  });
});

app.get("/test", (req, res) => {
  res.json({ data: null, text: "hii" });
});

app.use("/user", userRouter);
