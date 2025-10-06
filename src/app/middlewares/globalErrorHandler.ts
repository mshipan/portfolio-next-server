/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/AppError";
import { deleteImageFromCloudinary } from "../config/cloudinary.config";

export const globalErrorHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.file) {
    await deleteImageFromCloudinary(req.file.path);
  }

  let statusCode = 500;
  let message = `Something went wrong ${err.message}`;

  if (err.code === 11000) {
    const matchedArray = err.message.match(/"([^"]*)"/);
    statusCode = 400;
    message = `${matchedArray[1]} already exist.`;
  } else if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalide ID. Please provide a valid id.";
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    statusCode = 500;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    err,
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  });
};
