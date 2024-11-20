import fs from "fs";
import jwt from "jsonwebtoken";
import CustomLogger from "../utils/customLogger.js";
import ApiResponse from "../utils/apiResponse.js";
import cloudinaryUploader from "../utils/cloudinaryUploader.js";
import User from "../model/user.model.js";
const options = {
  httpOnly: true,
  secure: true,
};
const generateAccessAndRefereshToken = async (userId) => {
  const user = await User.findById(userId);
  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();
  return [accessToken, refreshToken];
};
export const getCurrentUser = async (req, res, next) => {
  const accessTokenCookie = req.cookies?.accessToken;
  const refreshTokenCookie = req.cookies?.refreshToken;
  if (!accessTokenCookie)
    return res.json(new ApiResponse(401, { user: null }, "No access token"));

  try {
    const user = jwt.verify(accessTokenCookie, process.env.ACCESS_TOKEN_SECRET);
    return res.json(new ApiResponse(200, { user }, "OK"));
  } catch (error) {
    if (error.name != "TokenExpiredError")
      return res.json(new ApiResponse(401, { user: null }, error));
    try {
      const refreshTokenData = jwt.verify(
        refreshTokenCookie,
        process.env.REFRESH_TOKEN_SECRET
      );
      const user = await User.findById(refreshTokenData._id);
      console.log(user);

      console.log(user.refreshToken);
      console.log("******\n");
      console.log(refreshTokenCookie);
      if (user.refreshToken != refreshTokenCookie)
        return res.json(
          new ApiResponse(401, { user: null }, "refreshToken mismatch")
        );
      const [newAccessToken, newRefreshToken] =
        await generateAccessAndRefereshToken(user._id);
      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        {
          refreshToken: newRefreshToken,
        },
        { returnDocument: "after" }
      ).select("-password -refreshToken");
      return res
        .cookie("accessToken", newAccessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
          new ApiResponse(
            200,
            { user: updatedUser },
            "Created new refresh token"
          )
        );
    } catch (refreshTokenError) {
      return res.json(
        new ApiResponse(401, { user: null }, { name: "refreshTokenExpired" })
      );
    }
  }
};

export const registerUser = async (req, res, next) => {
  try {
    const filePath = req.file.path;
    const { displayName, email, password } = req.body;
    const userExists = await User.exists({ email: email });
    if (userExists)
      return res.json(
        new ApiResponse(401, { user: null }, "User already exists")
      );
    const avatarUrl = await cloudinaryUploader(filePath);
    fs.unlinkSync(filePath);
    let createdUser = await User.create({
      displayName: displayName,
      email: email,
      password: password,
      avatarUrl: avatarUrl,
      refreshToken: "",
    });
    const [accessToken, refreshToken] = await generateAccessAndRefereshToken(
      createdUser._id
    );

    const user = await User.findByIdAndUpdate(
      createdUser._id,
      {
        refreshToken: refreshToken,
      },
      { returnDocument: "after" }
    ).select("-password -refreshToken");

    return res
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(new ApiResponse(200, { user }, "User created successfully"));
  } catch (error) {
    console.log(
      new CustomLogger("(user.controller.js)", "Request Body", error)
    );
    return res.json(new ApiResponse(500, { user: null }, error));
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = await User.find({ email: email });
    if (!userExists.length) {
      return res.json(
        new ApiResponse(401, { user: null }, "User does not exists")
      );
    }
    const isPasswordCorrect = await userExists[0].comparePassword(password);
    if (!isPasswordCorrect) {
      return res.json(
        new ApiResponse(401, { user: null }, "Password incorrect")
      );
    }

    const [accessToken, refreshToken] = await generateAccessAndRefereshToken(
      userExists[0]._id
    );

    const user = await User.findByIdAndUpdate(
      userExists[0]._id,
      {
        refreshToken: refreshToken,
      },
      { returnDocument: "after" }
    ).select("-password -refreshToken");
    return res
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(new ApiResponse(200, { user }, "OK"));
  } catch (error) {
    console.log(
      new CustomLogger("(user.controller.js)", "User Authentication", error)
    );
    return res.json(new ApiResponse(500, { user: null }, error));
  }
};

export const logoutUser = (req, res) => {
  return res.clearCookie("accessToken").clearCookie("refreshToken").send();
};
