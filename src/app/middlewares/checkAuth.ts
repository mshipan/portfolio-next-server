/* eslint-disable no-console */

import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import { verifyToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../config/db";

export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.cookies?.accessToken;

      if (!accessToken) {
        throw new AppError(httpStatus.UNAUTHORIZED, "No token provided.");
      }

      const verifiedToken = verifyToken(
        accessToken,
        process.env.JWT_ACCESS_SECRET as string
      ) as JwtPayload;

      const isUserExists = await prisma.user.findUnique({
        where: { email: verifiedToken.email },
      });

      if (!isUserExists) {
        throw new AppError(httpStatus.BAD_REQUEST, "User do not exists.");
      }

      if (!authRoles.includes(verifiedToken.role)) {
        throw new AppError(
          httpStatus.FORBIDDEN,
          "You're not permitted to view this route."
        );
      }

      req.user = verifiedToken;

      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
