import { Prisma } from "@prisma/client";
import { prisma } from "../../config/db";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";

const createOrUpdateAbout = async (payload: Prisma.AboutCreateInput) => {
  const existingAbout = await prisma.about.findFirst();

  const aboutId = existingAbout?.id || "about-singleton";

  const about = await prisma.about.upsert({
    where: { id: aboutId },
    update: {
      name: payload.name,
      title: payload.title,
      bio: payload.bio,
      email: payload.email,
      phone: payload.phone ?? null,
      address: payload.address ?? null,
      photo: payload.photo ?? null,
      skills: {
        create: payload.skills as Prisma.SkillCreateWithoutAboutInput[],
      },
      experiences: {
        create:
          payload.experiences as Prisma.ExperienceCreateWithoutAboutInput[],
      },
      educations: {
        create: payload.educations as Prisma.EducationCreateWithoutAboutInput[],
      },
    },
    create: {
      id: aboutId,
      name: payload.name,
      title: payload.title,
      bio: payload.bio,
      email: payload.email,
      phone: payload.phone ?? null,
      address: payload.address ?? null,
      photo: payload.photo ?? null,
      skills: {
        create: payload.skills as Prisma.SkillCreateWithoutAboutInput[],
      },
      experiences: {
        create:
          payload.experiences as Prisma.ExperienceCreateWithoutAboutInput[],
      },
      educations: {
        create: payload.educations as Prisma.EducationCreateWithoutAboutInput[],
      },
    },
    include: {
      skills: true,
      experiences: true,
      educations: true,
    },
  });

  return about;
};

const getAbout = async () => {
  const about = await prisma.about.findFirst({
    include: {
      experiences: true,
      educations: true,
    },
  });

  if (!about) {
    throw new AppError(httpStatus.NOT_FOUND, "About section not found.");
  }

  return about;
};

const deleteExperience = async (experienceId: string) => {
  const isExist = await prisma.experience.findUnique({
    where: { id: experienceId },
  });

  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Experience not found.");
  }

  await prisma.experience.delete({ where: { id: experienceId } });

  return { message: "Experience deleted successfully." };
};

const deleteEducation = async (educationId: string) => {
  const isExist = await prisma.education.findUnique({
    where: { id: educationId },
  });

  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Education not found.");
  }

  await prisma.education.delete({ where: { id: educationId } });

  return { message: "Education deleted successfully." };
};

export const AboutServices = {
  createOrUpdateAbout,
  getAbout,
  deleteExperience,
  deleteEducation,
};
