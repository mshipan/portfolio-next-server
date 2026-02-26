"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AboutServices = void 0;
const db_1 = require("../../config/db");
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const cloudinary_config_1 = require("../../config/cloudinary.config");
const createOrUpdateAbout = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const existingAbout = yield db_1.prisma.about.findFirst();
    const aboutId = (existingAbout === null || existingAbout === void 0 ? void 0 : existingAbout.id) || "about-singleton";
    if (existingAbout && payload.photo && existingAbout.photo) {
        yield (0, cloudinary_config_1.deleteImageFromCloudinary)(existingAbout.photo);
    }
    const about = yield db_1.prisma.about.upsert({
        where: { id: aboutId },
        update: {
            name: payload.name,
            title: payload.title,
            bio: payload.bio,
            email: payload.email,
            phone: (_a = payload.phone) !== null && _a !== void 0 ? _a : null,
            address: (_b = payload.address) !== null && _b !== void 0 ? _b : null,
            github: (_c = payload.github) !== null && _c !== void 0 ? _c : null,
            linkedIn: (_d = payload.linkedIn) !== null && _d !== void 0 ? _d : null,
            photo: (_e = payload.photo) !== null && _e !== void 0 ? _e : null,
        },
        create: {
            id: aboutId,
            name: payload.name,
            title: payload.title,
            bio: payload.bio,
            email: payload.email,
            phone: (_f = payload.phone) !== null && _f !== void 0 ? _f : null,
            address: (_g = payload.address) !== null && _g !== void 0 ? _g : null,
            github: (_h = payload.github) !== null && _h !== void 0 ? _h : null,
            linkedIn: (_j = payload.linkedIn) !== null && _j !== void 0 ? _j : null,
            photo: (_k = payload.photo) !== null && _k !== void 0 ? _k : null,
        },
        include: {
            skills: true,
            experiences: true,
            educations: true,
        },
    });
    return about;
});
const getAbout = () => __awaiter(void 0, void 0, void 0, function* () {
    const about = yield db_1.prisma.about.findFirst({
        include: {
            skills: true,
            experiences: true,
            educations: true,
        },
    });
    if (!about) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "About section not found.");
    }
    return about;
});
const updateAboutPhoto = (photo) => __awaiter(void 0, void 0, void 0, function* () {
    const existingAbout = yield db_1.prisma.about.findFirst();
    if (!existingAbout) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "About section not found");
    }
    if (existingAbout.photo) {
        yield (0, cloudinary_config_1.deleteImageFromCloudinary)(existingAbout.photo);
    }
    const updatedAbout = yield db_1.prisma.about.update({
        where: { id: existingAbout.id },
        data: { photo },
    });
    return updatedAbout;
});
const createSkill = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const about = yield db_1.prisma.about.findFirst();
    if (!about) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "About section not found.");
    }
    const isExist = yield db_1.prisma.skill.findFirst({
        where: {
            name: { equals: payload.name, mode: "insensitive" },
            category: (_a = payload.category) !== null && _a !== void 0 ? _a : null,
            aboutId: about.id
        }
    });
    if (isExist) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "This skill already exists in this category.");
    }
    const skill = yield db_1.prisma.skill.create({
        data: {
            name: payload.name,
            category: (_b = payload.category) !== null && _b !== void 0 ? _b : null,
            photo: (_c = payload.photo) !== null && _c !== void 0 ? _c : null,
            aboutId: about.id,
        },
    });
    return skill;
});
const getAllSkills = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, category, page, limit } = query;
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    const skip = (pageNum - 1) * limitNum;
    const filterConditions = {};
    if (search) {
        filterConditions.name = { contains: search, mode: 'insensitive' };
    }
    if (category) {
        filterConditions.category = category;
    }
    const result = yield db_1.prisma.skill.findMany({
        where: filterConditions,
        skip,
        take: limitNum,
        orderBy: { name: 'asc' },
    });
    const total = yield db_1.prisma.skill.count({ where: filterConditions });
    return {
        meta: {
            page: pageNum,
            limit: limitNum,
            total,
            totalPage: Math.ceil(total / limitNum),
        },
        data: result,
    };
});
const updateSkill = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield db_1.prisma.skill.findUnique({ where: { id } });
    if (!isExist) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Skill not found.");
    }
    const updatedSkill = yield db_1.prisma.skill.update({
        where: { id },
        data: payload,
    });
    if (payload.photo && isExist.photo) {
        yield (0, cloudinary_config_1.deleteImageFromCloudinary)(isExist.photo);
    }
    return updatedSkill;
});
const deleteSkill = (skillId) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield db_1.prisma.skill.findUnique({ where: { id: skillId } });
    if (!isExist) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Skill not found.");
    }
    yield db_1.prisma.skill.delete({ where: { id: skillId } });
    return { message: "Skill deleted successfully." };
});
const createExperience = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const about = yield db_1.prisma.about.findFirst();
    if (!about) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "About section not found.");
    }
    const experience = yield db_1.prisma.experience.create({
        data: {
            company: payload.company,
            jobTitle: payload.jobTitle,
            description: (_a = payload.description) !== null && _a !== void 0 ? _a : null,
            startYear: payload.startYear,
            endYear: (_b = payload.endYear) !== null && _b !== void 0 ? _b : "present",
            aboutId: about.id,
        },
    });
    return experience;
});
const getAllExperiences = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, page, limit } = query;
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    const filter = search
        ? {
            OR: [
                { company: { contains: search, mode: 'insensitive' } },
                { jobTitle: { contains: search, mode: 'insensitive' } },
            ],
        }
        : {};
    const [data, total] = yield Promise.all([
        db_1.prisma.experience.findMany({
            where: filter,
            skip: (pageNum - 1) * limitNum,
            take: limitNum,
            orderBy: { startYear: 'desc' },
        }),
        db_1.prisma.experience.count({ where: filter }),
    ]);
    return {
        meta: { page: pageNum, limit: limitNum, total, totalPage: Math.ceil(total / limitNum) },
        data,
    };
});
const updateExperience = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield db_1.prisma.experience.findUnique({ where: { id } });
    if (!isExist)
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Experience not found.");
    return yield db_1.prisma.experience.update({
        where: { id },
        data: payload,
    });
});
const deleteExperience = (experienceId) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield db_1.prisma.experience.findUnique({
        where: { id: experienceId },
    });
    if (!isExist) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Experience not found.");
    }
    yield db_1.prisma.experience.delete({ where: { id: experienceId } });
    return { message: "Experience deleted successfully." };
});
const createEducation = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const about = yield db_1.prisma.about.findFirst();
    if (!about) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "About section not found.");
    }
    const education = yield db_1.prisma.education.create({
        data: {
            degree: payload.degree,
            institution: payload.institution,
            description: (_a = payload.description) !== null && _a !== void 0 ? _a : null,
            startYear: payload.startYear,
            endYear: (_b = payload.endYear) !== null && _b !== void 0 ? _b : "present",
            aboutId: about.id,
        },
    });
    return education;
});
const getAllEducations = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, page, limit, sortOrder } = query;
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    const order = sortOrder === "asc" ? "asc" : "desc";
    const filter = search
        ? {
            OR: [
                { institution: { contains: search, mode: 'insensitive' } },
                { degree: { contains: search, mode: 'insensitive' } },
            ],
        }
        : {};
    const [data, total] = yield Promise.all([
        db_1.prisma.education.findMany({
            where: filter,
            skip: (pageNum - 1) * limitNum,
            take: limitNum,
            orderBy: { startYear: order },
        }),
        db_1.prisma.education.count({ where: filter }),
    ]);
    return {
        meta: { page: pageNum, limit: limitNum, total, totalPage: Math.ceil(total / limitNum) },
        data,
    };
});
const updateEducation = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield db_1.prisma.education.findUnique({ where: { id } });
    if (!isExist)
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Education not found.");
    return yield db_1.prisma.education.update({
        where: { id },
        data: payload,
    });
});
const deleteEducation = (educationId) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield db_1.prisma.education.findUnique({
        where: { id: educationId },
    });
    if (!isExist) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Education not found.");
    }
    yield db_1.prisma.education.delete({ where: { id: educationId } });
    return { message: "Education deleted successfully." };
});
exports.AboutServices = {
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
//# sourceMappingURL=about.service.js.map