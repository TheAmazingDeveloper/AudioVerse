import { Router } from "express";
import {
  getCurrentUser,
  registerUser,
  loginUser,
} from "../controller/user.controller.js";
import multerFileUpload from "../middleware/multer.middleware.js";

const userRouter = Router();

userRouter.get("/get-current-user", getCurrentUser);
userRouter.post("/register", multerFileUpload.single("avatar"), registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", (req, res) => {
  return res.clearCookie("accessToken").clearCookie("refreshToken").send();
});
export default userRouter;
