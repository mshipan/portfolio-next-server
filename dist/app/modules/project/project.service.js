"use strict";
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
exports.ProjectServices = void 0;
const client_1 = require("@prisma/client");
const slugify_1 = __importDefault(require("slugify"));
const db_1 = require("../../config/db");
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const cloudinary_config_1 = require("../../config/cloudinary.config");
const createProject = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = payload;
    const slug = (0, slugify_1.default)(title, { lower: true, strict: true });
    const isExist = yield db_1.prisma.project.findUnique({ where: { slug } });
    if (isExist) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Project with this title already exists.");
    }
    const newProject = yield db_1.prisma.project.create({
        data: Object.assign(Object.assign({}, payload), { slug }),
    });
    return newProject;
});
const getAllProjects = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, sortBy, sortOrder, limit, page, featured, published } = query;
    const searchConditions = search ? {
        OR: [
            { title: { contains: search, mode: client_1.Prisma.QueryMode.insensitive } },
            { description: { contains: search, mode: client_1.Prisma.QueryMode.insensitive } },
            { techStack: { hasSome: [search] } }
        ],
    } : {};
    const filterConditions = Object.assign({}, searchConditions);
    if (featured !== undefined) {
        filterConditions.featured = featured === "true";
    }
    if (published !== undefined) {
        filterConditions.published = published === "true";
    }
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    const skip = (pageNum - 1) * limitNum;
    const sort = sortBy || "createdAt";
    const order = sortOrder || "desc";
    const result = yield db_1.prisma.project.findMany({
        where: filterConditions,
        skip,
        take: limitNum,
        orderBy: { [sort]: order },
    });
    const total = yield db_1.prisma.project.count({ where: filterConditions });
    const totalPage = Math.ceil(total / limitNum);
    return {
        meta: {
            page: pageNum,
            limit: limitNum,
            total,
            totalPage
        },
        data: result,
    };
});
const getSingleProject = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const isProjectExist = yield db_1.prisma.project.findUnique({ where: { slug } });
    if (!isProjectExist) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Project not found.");
    }
    return isProjectExist;
});
const updateProject = (slug, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isProjectExist = yield db_1.prisma.project.findUnique({ where: { slug } });
    if (!isProjectExist) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Project not found.");
    }
    if (payload.title && payload.title !== isProjectExist.title) {
        const newSlug = (0, slugify_1.default)(payload.title, {
            lower: true,
            strict: true,
        });
        const slugExists = yield db_1.prisma.project.findUnique({
            where: { slug: newSlug },
        });
        if (slugExists && slugExists.id !== isProjectExist.id) {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Another project with this title already exists.");
        }
        payload.slug = newSlug;
    }
    const updatedProject = yield db_1.prisma.project.update({
        where: { slug },
        data: payload,
    });
    if (payload.thumbnail && isProjectExist.thumbnail) {
        try {
            yield (0, cloudinary_config_1.deleteImageFromCloudinary)(isProjectExist.thumbnail);
        }
        catch (error) {
            console.warn("Failed to delete previous image:", error.message);
        }
    }
    return updatedProject;
});
const deleteProject = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const isProjectExist = yield db_1.prisma.project.findUnique({ where: { slug } });
    if (!isProjectExist) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Project not found.");
    }
    if (isProjectExist.thumbnail) {
        yield (0, cloudinary_config_1.deleteImageFromCloudinary)(isProjectExist.thumbnail);
    }
    yield db_1.prisma.project.delete({ where: { slug } });
    return { message: "Project Deleted Successfully." };
});
exports.ProjectServices = {
    createProject,
    getAllProjects,
    getSingleProject,
    updateProject,
    deleteProject,
};
//# sourceMappingURL=project.service.js.map