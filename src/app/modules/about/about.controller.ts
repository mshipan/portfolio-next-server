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

const createSkill = catchAsync(async (req: Request, res: Response) => {
  req.body = JSON.parse(req.body.data) || req.body;

  const payload: Prisma.SkillCreateInput = {
    ...req.body,
    photo: req.file?.path,
  };

  const skill = await AboutServices.createSkill(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Skill created successfully.",
    data: skill,
  });
});

const getAllSkills = catchAsync(async (req: Request, res: Response) => {
  const skills = await AboutServices.getAllSkills();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Skills retrieved successfully.",
    data: skills,
  });
});

const deleteSkill = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;

  const result = await AboutServices.deleteSkill(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: result.message,
    data: null,
  });
});

const createExperience = catchAsync(async (req: Request, res: Response) => {
  const experience = await AboutServices.createExperience(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Experience created successfully.",
    data: experience,
  });
});

const getAllExperiences = catchAsync(async (req: Request, res: Response) => {
  const experience = await AboutServices.getAllExperiences();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Experiences retrieved successfully.",
    data: experience,
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

const createEducation = catchAsync(async (req: Request, res: Response) => {
  const education = await AboutServices.createEducation(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Education created successfully.",
    data: education,
  });
});

const getAllEducations = catchAsync(async (req: Request, res: Response) => {
  const education = await AboutServices.getAllEducations();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Education retrieved successfully.",
    data: education,
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
  createSkill,
  getAllSkills,
  deleteSkill,
  createExperience,
  getAllExperiences,
  deleteExperience,
  createEducation,
  getAllEducations,
  deleteEducation,
};
