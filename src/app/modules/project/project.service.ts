/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Prisma } from "@prisma/client";
import slugify from "slugify";
import { prisma } from "../../config/db";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import { deleteImageFromCloudinary } from "../../config/cloudinary.config";

const createProject = async (payload: Prisma.ProjectCreateInput) => {
  const { title } = payload;

  const slug = slugify(title, { lower: true, strict: true });

  const isExist = await prisma.project.findUnique({ where: { slug } });

  if (isExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Project with this title already exists."
    );
  }

  const newProject = await prisma.project.create({
    data: { ...payload, slug },
  });

  return newProject;
};

const getAllProjects = async (query:Record<string, any>) => {
  const {search,sortBy,sortOrder,limit,page,featured, published } = query;

  const searchConditions = search ?{
    OR:[
      {title:{contains: search as string, mode:Prisma.QueryMode.insensitive}},
      {description:{contains:search as string, mode:Prisma.QueryMode.insensitive}},
      {techStack: {hasSome:[search as string]}}
    ],
  }:{};

  const filterConditions:any = {...searchConditions};

  if(featured !== undefined){
    filterConditions.featured = featured === "true";
  }

  if (published !== undefined) {
    filterConditions.published = published === "true";
  }

  const pageNum = Number(page) || 1;
  const limitNum = Number(limit) || 10;
  const skip= (pageNum - 1) * limitNum;

  const sort = (sortBy as string) || "createdAt";
  const order = (sortOrder as string) || "desc";


  const result = await prisma.project.findMany({
    where: filterConditions,
    skip,
    take:limitNum,
    orderBy: { [sort]: order },
  });

  const total = await prisma.project.count({where:filterConditions});
  const totalPage = Math.ceil(total/limitNum);

  return {
    meta:{
      page: pageNum,
      limit: limitNum,
      total,
      totalPage
    },
    data: result,
  };
};

const getSingleProject = async (slug: string) => {
  const isProjectExist = await prisma.project.findUnique({ where: { slug } });

  if (!isProjectExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Project not found.");
  }

  return isProjectExist;
};

const updateProject = async (
  slug: string,
  payload: Partial<Prisma.ProjectUpdateInput>
) => {
  const isProjectExist = await prisma.project.findUnique({ where: { slug } });

  if (!isProjectExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Project not found.");
  }

  if (payload.title && payload.title !== isProjectExist.title) {
    const newSlug = slugify(payload.title as string, {
      lower: true,
      strict: true,
    });

    const slugExists = await prisma.project.findUnique({
      where: { slug: newSlug },
    });

    if (slugExists && slugExists.id !== isProjectExist.id) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Another project with this title already exists."
      );
    }

    payload.slug = newSlug;
  }

  const updatedProject = await prisma.project.update({
    where: { slug },
    data: payload,
  });

  if (payload.thumbnail && isProjectExist.thumbnail) {
    try {
      await deleteImageFromCloudinary(isProjectExist.thumbnail);
    } catch (error: any) {
      console.warn("Failed to delete previous image:", error.message);
    }
  }

  return updatedProject;
};

const deleteProject = async (slug: string) => {
  const isProjectExist = await prisma.project.findUnique({ where: { slug } });

  if (!isProjectExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Project not found.");
  }

  if (isProjectExist.thumbnail) {
    await deleteImageFromCloudinary(isProjectExist.thumbnail);
  }

  await prisma.project.delete({ where: { slug } });

  return { message: "Project Deleted Successfully." };
};

export const ProjectServices = {
  createProject,
  getAllProjects,
  getSingleProject,
  updateProject,
  deleteProject,
};
