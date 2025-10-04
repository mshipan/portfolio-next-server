/* eslint-disable @typescript-eslint/no-unused-vars */

import { prisma } from "../../config/db";
import AppError from "../../errorHelpers/AppError";
import { LoginPayload } from "../../interfaces";
import httpStatus from "http-status-codes";
import bcrypt from "bcryptjs";
import {
  createNewAccessTokenWithRefreshToken,
  createUserToken,
} from "../../utils/userToken";

const credentialsLogin = async (payload: LoginPayload) => {
  const { email, password } = payload;

  const isUserExist = await prisma.user.findFirst({ where: { email } });

  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User does not exist.");
  }

  const isPasswordMatched = await bcrypt.compare(
    password,
    isUserExist.password
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.BAD_REQUEST, "Incorrect password.");
  }

  const userToken = createUserToken(isUserExist);

  const { password: _, ...rest } = isUserExist;

  return {
    accessToken: userToken.accessToken,
    refreshToken: userToken.refreshToken,
    user: rest,
  };
};

const getNewAccessToken = async (refreshToken: string) => {
  const newAccessToken = await createNewAccessTokenWithRefreshToken(
    refreshToken
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthServices = {
  credentialsLogin,
  getNewAccessToken,
};
