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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogServices = void 0;
const client_1 = require("@prisma/client");
const db_1 = require("../../config/db");
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const slugify_1 = __importDefault(require("slugify"));
const cloudinary_config_1 = require("../../config/cloudinary.config");
const createBlog = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, authorId } = payload, otherData = __rest(payload, ["title", "authorId"]);
    const slug = (0, slugify_1.default)(title, { lower: true, strict: true });
    const isSlugExist = yield db_1.prisma.blog.findUnique({ where: { slug } });
    if (isSlugExist) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Blog with this title already exists.");
    }
    const newBlog = yield db_1.prisma.blog.create({
        data: Object.assign(Object.assign({}, otherData), { title,
            slug, author: {
                connect: {
                    id: authorId,
                },
            } }),
    });
    return newBlog;
});
const getAllBlogs = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, sortBy, sortOrder, limit, page, published } = query;
    const searchConditions = search ? { OR: [
            { title: { contains: search, mode: client_1.Prisma.QueryMode.insensitive } },
            { content: { contains: search, mode: client_1.Prisma.QueryMode.insensitive } }
        ] } : {};
    const filterConditions = Object.assign({}, searchConditions);
    if (published !== undefined) {
        filterConditions.published = published === "true";
    }
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    const skip = (pageNum - 1) * limitNum;
    const sort = sortBy || "createdAt";
    const order = sortOrder || "desc";
    const result = yield db_1.prisma.blog.findMany({
        where: filterConditions,
        skip,
        take: limitNum,
        orderBy: { [sort]: order },
        include: { author: true }
    });
    const total = yield db_1.prisma.blog.count({ where: filterConditions });
    const totalPage = Math.ceil(total / limitNum);
    return {
        meta: {
            page: pageNum,
            limit: limit,
            total,
            totalPage
        },
        data: result,
    };
});
const getSingleBlog = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield db_1.prisma.blog.findUnique({
        where: { slug },
    });
    if (!blog) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Blog not found.");
    }
    return blog;
});
const updateBlog = (slug, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield db_1.prisma.blog.findUnique({
        where: { slug },
    });
    if (!isExist) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Blog not found.");
    }
    if (payload.title && payload.title !== isExist.title) {
        const newSlug = (0, slugify_1.default)(payload.title, {
            lower: true,
            strict: true,
        });
        const slugExists = yield db_1.prisma.blog.findUnique({
            where: { slug: newSlug },
        });
        if (slugExists && slugExists.id !== isExist.id) {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Another blog with this title already exists.");
        }
        payload.slug = newSlug;
    }
    const updatedBlog = yield db_1.prisma.blog.update({
        where: { slug },
        data: payload,
    });
    if (payload.coverUrl && isExist.coverUrl) {
        try {
            yield (0, cloudinary_config_1.deleteImageFromCloudinary)(isExist.coverUrl);
        }
        catch (error) {
            console.warn("Failed to delete previous cover image:", error.message);
        }
    }
    return updatedBlog;
});
const deleteBlog = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield db_1.prisma.blog.findUnique({
        where: { slug },
    });
    if (!isExist) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Blog not found.");
    }
    if (isExist.coverUrl) {
        yield (0, cloudinary_config_1.deleteImageFromCloudinary)(isExist.coverUrl);
    }
    yield db_1.prisma.blog.delete({ where: { slug } });
    return { message: "Blog deleted successfully." };
});
exports.BlogServices = {
    createBlog,
    getAllBlogs,
    getSingleBlog,
    updateBlog,
    deleteBlog,
};
//# sourceMappingURL=blog.service.js.map