"use strict";
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
exports.ContactServices = void 0;
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const db_1 = require("../../config/db");
const mail_config_1 = require("../../config/mail.config");
const sendEmail = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, message } = payload;
    if (!name || !email || !message) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "All fields are required");
    }
    const savedMessage = yield db_1.prisma.contactMessage.create({
        data: {
            name,
            email,
            message
        },
    });
    yield mail_config_1.transporter.sendMail({
        from: `"${name} <${email}>"`,
        to: process.env.SMTP_USER,
        subject: `New Contact Message from ${name}`,
        html: `
            <h2>New Contact Message</h2>
            <br/>
            <br/>
            <p><strong>Name:</strong>${name}</p>
            <p><strong>Email:</strong>${email}</p>
            <br/>
            <br/>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
            <hr/>
            <small>Received at: ${new Date().toLocaleString()}</small>
        `
    });
    return savedMessage;
});
const getAllMessages = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 10, search } = query;
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const filter = search
        ? {
            OR: [
                {
                    name: {
                        contains: String(search),
                        mode: "insensitive",
                    },
                },
                {
                    email: {
                        contains: String(search),
                        mode: "insensitive",
                    },
                },
            ],
        }
        : {};
    const [data, total] = yield Promise.all([
        db_1.prisma.contactMessage.findMany({
            where: filter,
            orderBy: { createdAt: "desc" },
            skip: (pageNum - 1) * limitNum,
            take: limitNum,
        }),
        db_1.prisma.contactMessage.count({ where: filter }),
    ]);
    return {
        meta: {
            page: pageNum,
            limit: limitNum,
            total,
            totalPage: Math.ceil(total / limitNum),
        },
        data,
    };
});
const markAsRead = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const exist = yield db_1.prisma.contactMessage.findUnique({ where: { id } });
    if (!exist) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Message not found.");
    }
    return db_1.prisma.contactMessage.update({
        where: { id },
        data: { isRead: true },
    });
});
const deleteMessage = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const exist = yield db_1.prisma.contactMessage.findUnique({ where: { id } });
    if (!exist) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Message not found.");
    }
    yield db_1.prisma.contactMessage.delete({ where: { id } });
    return { message: "Message deleted successfully." };
});
const getUnreadCount = () => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.prisma.contactMessage.count({
        where: { isRead: false }
    });
});
exports.ContactServices = {
    sendEmail,
    getAllMessages,
    markAsRead,
    deleteMessage,
    getUnreadCount,
};
//# sourceMappingURL=contact.service.js.map