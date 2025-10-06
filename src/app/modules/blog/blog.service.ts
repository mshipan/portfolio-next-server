/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Prisma } from "@prisma/client";
import { prisma } from "../../config/db";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import slugify from "slugify";
import { deleteImageFromCloudinary } from "../../config/cloudinary.config";

const createBlog = async (payload: Prisma.BlogCreateInput) => {
  const { title } = payload;

  const slug = slugify(title, { lower: true, strict: true });

  const isSlugExist = await prisma.blog.findUnique({ where: { slug } });

  if (isSlugExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Blog with this title is already exist."
    );
  }

  const newBlog = await prisma.blog.create({
    data: { ...payload, slug },
  });

  return newBlog;
};

const getAllBlogs = async () => {
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
  });

  return blogs;
};

const getSingleBlog = async (slug: string) => {
  const blog = await prisma.blog.findUnique({
    where: { slug },
  });

  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog not found.");
  }

  return blog;
};

const updateBlog = async (slug: string, payload: Prisma.BlogUpdateInput) => {
  const isExist = await prisma.blog.findUnique({
    where: { slug },
  });

  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog not found.");
  }

  if (payload.title && payload.title !== isExist.title) {
    const newSlug = slugify(payload.title as string, {
      lower: true,
      strict: true,
    });

    const slugExists = await prisma.blog.findUnique({
      where: { slug: newSlug },
    });

    if (slugExists && slugExists.id !== isExist.id) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Another blog with this title already exists."
      );
    }

    payload.slug = newSlug;
  }

  const updatedBlog = await prisma.blog.update({
    where: { slug },
    data: payload,
  });

  if (payload.coverUrl && isExist.coverUrl) {
    try {
      await deleteImageFromCloudinary(isExist.coverUrl);
    } catch (error: any) {
      console.warn("Failed to delete previous cover image:", error.message);
    }
  }

  return updatedBlog;
};

const deleteBlog = async (slug: string) => {
  const isExist = await prisma.blog.findUnique({
    where: { slug },
  });

  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog not found.");
  }

  if (isExist.coverUrl) {
    await deleteImageFromCloudinary(isExist.coverUrl);
  }

  await prisma.blog.delete({ where: { slug } });

  return { message: "Blog deleted successfully." };
};

export const BlogServices = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};
