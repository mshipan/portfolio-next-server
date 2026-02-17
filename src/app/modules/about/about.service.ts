/* eslint-disable @typescript-eslint/no-explicit-any */
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

const updateAboutPhoto = async (photo:string) => {
  const existingAbout = await prisma.about.findFirst();

  if(!existingAbout) {
    throw new AppError(httpStatus.NOT_FOUND, "About section not found");
  }

  if(existingAbout.photo) {
    await deleteImageFromCloudinary(existingAbout.photo);
  }

  const updatedAbout = await prisma.about.update({
    where: {id:existingAbout.id},
    data: {photo},
  });

  return updatedAbout;
}

const createSkill = async (payload: Prisma.SkillCreateInput) => {
  const about = await prisma.about.findFirst();

  if (!about) {
    throw new AppError(httpStatus.NOT_FOUND, "About section not found.");
  }

  const isExist = await prisma.skill.findFirst({
    where: {
      name:{equals: payload.name, mode:"insensitive"},
      category: payload.category ?? null,
      aboutId: about.id
    }
  })

  if(isExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "This skill already exists in this category.")
  }

  const skill = await prisma.skill.create({
    data: {
      name: payload.name,
      category: payload.category ?? null,
      photo: payload.photo ?? null,
      aboutId: about.id,
    },
  });

  return skill;
};

const getAllSkills = async (query: Record<string, any>) => {
  const {search,category, page, limit} = query;

  const pageNum = Number(page) || 1;
  const limitNum = Number(limit) || 10;
  const skip = (pageNum - 1) * limitNum;

const filterConditions: Prisma.SkillWhereInput = {};

  if (search) {
    filterConditions.name = { contains: search, mode: 'insensitive' };
  }

  if (category) {
    filterConditions.category = category;
  }

  const result = await prisma.skill.findMany({
    where: filterConditions,
    skip,
    take: limitNum,
    orderBy: { name: 'asc' },
  });

  const total = await prisma.skill.count({ where: filterConditions });

  return {
    meta: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPage: Math.ceil(total / limitNum),
    },
    data: result,
  };
};

const updateSkill = async (id: string, payload: Partial<Prisma.SkillUpdateInput>) => {
  const isExist = await prisma.skill.findUnique({ where: { id } });
  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Skill not found.");
  }

  const updatedSkill = await prisma.skill.update({
    where: { id },
    data: payload,
  });

  if (payload.photo && isExist.photo) {
    await deleteImageFromCloudinary(isExist.photo);
  }

  return updatedSkill;
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

const getAllExperiences = async (query: Record<string, any>) => {
  const { search, page, limit } = query;
  const pageNum = Number(page) || 1;
  const limitNum = Number(limit) || 10;

  const filter: Prisma.ExperienceWhereInput = search
    ? {
        OR: [
          { company: { contains: search, mode: 'insensitive' } },
          { jobTitle: { contains: search, mode: 'insensitive' } },
        ],
      }
    : {};

  const [data, total] = await Promise.all([
    prisma.experience.findMany({
      where: filter,
      skip: (pageNum - 1) * limitNum,
      take: limitNum,
      orderBy: { startYear: 'desc' },
    }),
    prisma.experience.count({ where: filter }),
  ]);

  return {
    meta: { page: pageNum, limit: limitNum, total, totalPage: Math.ceil(total / limitNum) },
    data,
  };
};

const updateExperience = async (id: string, payload: Partial<Prisma.ExperienceUpdateInput>) => {
  const isExist = await prisma.experience.findUnique({ where: { id } });
  if (!isExist) throw new AppError(httpStatus.NOT_FOUND, "Experience not found.");

  return await prisma.experience.update({
    where: { id },
    data: payload,
  });
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

const getAllEducations = async (query: Record<string, any>) => {
  const { search, page, limit } = query;
  const pageNum = Number(page) || 1;
  const limitNum = Number(limit) || 10;

  const filter: Prisma.EducationWhereInput = search
    ? {
        OR: [
          { institution: { contains: search, mode: 'insensitive' } },
          { degree: { contains: search, mode: 'insensitive' } },
        ],
      }
    : {};

  const [data, total] = await Promise.all([
    prisma.education.findMany({
      where: filter,
      skip: (pageNum - 1) * limitNum,
      take: limitNum,
      orderBy: { startYear: 'desc' },
    }),
    prisma.education.count({ where: filter }),
  ]);

  return {
    meta: { page: pageNum, limit: limitNum, total, totalPage: Math.ceil(total / limitNum) },
    data,
  };
};

const updateEducation = async (id: string, payload: Partial<Prisma.EducationUpdateInput>) => {
  const isExist = await prisma.education.findUnique({ where: { id } });
  if (!isExist) throw new AppError(httpStatus.NOT_FOUND, "Education not found.");

  return await prisma.education.update({
    where: { id },
    data: payload,
  });
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
