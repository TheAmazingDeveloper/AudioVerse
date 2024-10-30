import Express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config({ path: "./.env" });

const app = Express();

app.use(Express.urlencoded());
app.use(cookieParser());
app.use(cors())

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server listening on http://localhost:${process.env.PORT}`);
});

app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "OK",
  });
});
