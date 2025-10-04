/* eslint-disable no-console */

import httpStatus from "http-status-codes";
import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";
import AppError from "../errorHelpers/AppError";
import { prisma } from "../config/db";

export const seedOwner = async () => {
  try {
    const email = process.env.OWNER_EMAIL;
    const password = process.env.OWNER_PASSWORD;

    if (!email) {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "OWNER_EMAIL is not defined in .env"
      );
    }

    if (!password) {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "OWNER_PASSWORD is not defined in .env"
      );
    }

    const isOwnerExist = await prisma.user.findFirst({
      where: { email, role: "owner" },
    });

    if (isOwnerExist) {
      console.log("Owner already exist.");

      return;
    }

    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.BCRYPT_SALT_ROUND)
    );

    const payload: Prisma.UserCreateInput = {
      name: "Shipan Mallik",
      email,
      password: hashedPassword,
      role: "owner",
    };

    await prisma.user.create({
      data: payload,
    });

    console.log("Owner created successfully!");
  } catch (error) {
    console.error("Error while seeding owner:", error);
  }
};
