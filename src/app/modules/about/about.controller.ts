import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AboutServices } from "./about.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { Prisma } from "@prisma/client";

const createOrUpdateAbout = catchAsync(async (req: Request, res: Response) => {
  req.body = JSON.parse(req.body.data) || req.body;

  const payload: Prisma.AboutCreateInput = {
    ...req.body,
    photo: req.file?.path,
  };
  const about = await AboutServices.createOrUpdateAbout(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "About section created / updated successfully.",
    data: about,
  });
});

const getAbout = catchAsync(async (req: Request, res: Response) => {
  const about = await AboutServices.getAbout();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "About section retrieved successfully.",
    data: about,
  });
});

const deleteExperience = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;

  const result = await AboutServices.deleteExperience(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: result.message,
    data: null,
  });
});

const deleteEducation = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;

  const result = await AboutServices.deleteEducation(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: result.message,
    data: null,
  });
});

export const AboutController = {
  createOrUpdateAbout,
  getAbout,
  deleteExperience,
  deleteEducation,
};
