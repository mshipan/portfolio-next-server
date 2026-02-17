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

const updateAboutPhoto = catchAsync(async (req: Request, res: Response) => {
  const photo = req.file?.path;

  if(!photo) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "Photo is required",
    });
  }

  const result = await AboutServices.updateAboutPhoto(photo);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Profile photo updated successfully",
    data: result,
  })
})

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
  const skills = await AboutServices.getAllSkills(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Skills retrieved successfully.",
    data: skills.data,
    meta: skills.meta,
  });
});

const updateSkill = catchAsync(async(req:Request,res:Response) => {
  const {id}= req.params;
  req.body = JSON.parse(req.body.data) || req.body;

  const payload = {
    ...req.body,
    photo:req.file?.path,
  };

  const result = await AboutServices.updateSkill(id as string, payload);

  sendResponse(res,{
    success: true,
    statusCode: httpStatus.OK,
    message: "Skill updated successfully.",
    data: result,
  })
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
  const result = await AboutServices.getAllExperiences(req.query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Experiences retrieved successfully.",
    meta: result.meta,
    data: result.data,
  });
});

const updateExperience = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AboutServices.updateExperience(id as string, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Experience updated successfully.",
    data: result,
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
  const result = await AboutServices.getAllEducations(req.query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Educations retrieved successfully.",
    meta: result.meta,
    data: result.data,
  });
});

const updateEducation = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AboutServices.updateEducation(id as string, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Education updated successfully.",
    data: result,
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
  updateAboutPhoto,
  createSkill,
  getAllSkills,
  updateSkill,
  deleteSkill,
  createExperience,
  getAllExperiences,
  updateExperience,
  deleteExperience,
  createEducation,
  getAllEducations,
  updateEducation,
  deleteEducation,
};
