import { Prisma } from "@prisma/client";
import { prisma } from "../../config/db";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import { deleteImageFromCloudinary } from "../../config/cloudinary.config";

const createOrUpdateAbout = async (payload: Prisma.AboutCreateInput) => {
  const existingAbout = await prisma.about.findFirst();

  const aboutId = existingAbout?.id || "about-singleton";

  if (existingAbout && payload.photo && existingAbout.photo) {
    await deleteImageFromCloudinary(existingAbout.photo);
  }

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
      skills: true,
      experiences: true,
      educations: true,
    },
  });

  if (!about) {
    throw new AppError(httpStatus.NOT_FOUND, "About section not found.");
  }

  return about;
};

const createSkill = async (payload: Prisma.SkillCreateInput) => {
  const about = await prisma.about.findFirst();

  if (!about) {
    throw new AppError(httpStatus.NOT_FOUND, "About section not found.");
  }

  const skill = await prisma.skill.create({
    data: {
      name: payload.name,
      photo: payload.photo ?? null,
      aboutId: about.id,
    },
  });

  return skill;
};

const getAllSkills = async () => {
  const skills = prisma.skill.findMany();

  if (!skills) {
    throw new AppError(httpStatus.NOT_FOUND, "Skills not found.");
  }

  return skills;
};

const deleteSkill = async (skillId: string) => {
  const isExist = await prisma.skill.findUnique({ where: { id: skillId } });

  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Skill not found.");
  }

  await prisma.skill.delete({ where: { id: skillId } });

  return { message: "Skill deleted successfully." };
};

const createExperience = async (payload: Prisma.ExperienceCreateInput) => {
  const about = await prisma.about.findFirst();

  if (!about) {
    throw new AppError(httpStatus.NOT_FOUND, "About section not found.");
  }

  const experience = await prisma.experience.create({
    data: {
      company: payload.company,
      jobTitle: payload.jobTitle,
      description: payload.description ?? null,
      startYear: payload.startYear,
      endYear: payload.endYear ?? "present",
      aboutId: about.id,
    },
  });

  return experience;
};

const getAllExperiences = async () => {
  const experiences = prisma.experience.findMany();

  if (!experiences) {
    throw new AppError(httpStatus.NOT_FOUND, "Experiences not found.");
  }

  return experiences;
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

const createEducation = async (payload: Prisma.EducationCreateInput) => {
  const about = await prisma.about.findFirst();

  if (!about) {
    throw new AppError(httpStatus.NOT_FOUND, "About section not found.");
  }

  const education = await prisma.education.create({
    data: {
      degree: payload.degree,
      institution: payload.institution,
      description: payload.description ?? null,
      startYear: payload.startYear,
      endYear: payload.endYear ?? "present",
      aboutId: about.id,
    },
  });

  return education;
};

const getAllEducations = async () => {
  const educations = prisma.education.findMany();

  if (!educations) {
    throw new AppError(httpStatus.NOT_FOUND, "Educations not found.");
  }

  return educations;
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
