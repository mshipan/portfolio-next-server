import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AboutServices } from "./about.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";

const createOrUpdateAbout = catchAsync(async (req: Request, res: Response) => {
  const about = await AboutServices.createOrUpdateAbout(req.body);

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
