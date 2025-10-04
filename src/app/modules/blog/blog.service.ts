import { Prisma } from "@prisma/client";
import { prisma } from "../../config/db";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import slugify from "slugify";

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
    data: payload,
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

  const updatedBlog = await prisma.blog.update({
    where: { slug },
    data: payload,
  });

  return updatedBlog;
};

const deleteBlog = async (slug: string) => {
  const isExist = await prisma.blog.findUnique({
    where: { slug },
  });

  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog not found.");
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
