import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { BlogServices } from "./blog.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { Prisma } from "@prisma/client";

const createBlog = catchAsync(async (req: Request, res: Response) => {
  req.body = JSON.parse(req.body.data) || req.body;

 const payload = {
    ...req.body,
    coverUrl: req.file?.path,
    authorId: req.user?.userId,
  };
  const result = await BlogServices.createBlog(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Blog created successfully.",
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogServices.getAllBlogs(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All blogs retrieved successfully.",
    data: result.data,
    meta: result.meta
  });
});

const getSingleBlog = catchAsync(async (req: Request, res: Response) => {
  const slug = req.params.slug as string;

  const result = await BlogServices.getSingleBlog(slug);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blog retrieved successfully.",
    data: result,
  });
});

const updateBlog = catchAsync(async (req: Request, res: Response) => {
  req.body = JSON.parse(req.body.data) || req.body;

  const payload: Prisma.BlogUpdateInput = {
    ...req.body,
    coverUrl: req.file?.path,
  };

  const slug = req.params.slug as string;

  const result = await BlogServices.updateBlog(slug, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blog updated successfully.",
    data: result,
  });
});

const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const slug = req.params.slug as string;

  const result = await BlogServices.deleteBlog(slug);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: result.message,
    data: null,
  });
});

export const BlogController = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};
