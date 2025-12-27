import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AuthServices } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { createUserToken } from "../../utils/userToken";
import { setAuthCookie } from "../../utils/setCookie";
import AppError from "../../errorHelpers/AppError";
import jwt from "jsonwebtoken";

const credentialsLogin = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.credentialsLogin(req.body);

  const userTokens = createUserToken(result.user);

  setAuthCookie(res, userTokens);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User Logged in Successfull.",
    data: {
      accessToken: userTokens.accessToken,
      refreshToken: userTokens.refreshToken,
      user: result.user,
    },
  });
});

const getNewAccessToken = catchAsync(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "No refresh token received from cookies."
    );
  }

  const tokenInfo = await AuthServices.getNewAccessToken(refreshToken);

  setAuthCookie(res, tokenInfo);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "New access token retrieved successfully.",
    data: tokenInfo,
  });
});

const logout = catchAsync(async (req: Request, res: Response) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User Logged Out Successfully.",
    data: null,
  });
});

const getMe = catchAsync(async (req: Request, res: Response) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Access token not found.");
  }

  const decoded = jwt.verify(
    accessToken,
    process.env.JWT_ACCESS_SECRET as string
  ) as { userId: string };

  const user = await AuthServices.getMe(decoded.userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User retrieved successfully.",
    data: user,
  });
});

export const AuthController = {
  credentialsLogin,
  getNewAccessToken,
  logout,
  getMe,
};
