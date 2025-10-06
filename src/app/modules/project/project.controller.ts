import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { ProjectServices } from "./project.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { Prisma } from "@prisma/client";

const createProject = catchAsync(async (req: Request, res: Response) => {
  req.body = JSON.parse(req.body.data) || req.body;

  const payload: Prisma.ProjectCreateInput = {
    ...req.body,
    thumbnail: req.file?.path,
  };

  const result = await ProjectServices.createProject(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Project created successfully.",
    data: result,
  });
});

const getAllProjects = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectServices.getAllProjects();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All projects retrieved successfully.",
    data: result,
  });
});

const getSingleProject = catchAsync(async (req: Request, res: Response) => {
  const slug = req.params.slug as string;

  const result = await ProjectServices.getSingleProject(slug);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Project retrieved successfully.",
    data: result,
  });
});

const updateProject = catchAsync(async (req: Request, res: Response) => {
  req.body = JSON.parse(req.body.data) || req.body;

  const payload: Prisma.ProjectUpdateInput = {
    ...req.body,
    thumbnail: req.file?.path,
  };
  const slug = req.params.slug as string;

  const result = await ProjectServices.updateProject(slug, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Project updated successfully.",
    data: result,
  });
});

const deleteProject = catchAsync(async (req: Request, res: Response) => {
  const slug = req.params.slug as string;

  const result = await ProjectServices.deleteProject(slug);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: result.message,
    data: null,
  });
});

export const ProjectController = {
  createProject,
  getAllProjects,
  getSingleProject,
  updateProject,
  deleteProject,
};
