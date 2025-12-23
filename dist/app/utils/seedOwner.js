"use strict";
/* eslint-disable no-console */
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
exports.seedOwner = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const AppError_1 = __importDefault(require("../errorHelpers/AppError"));
const db_1 = require("../config/db");
const seedOwner = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = process.env.OWNER_EMAIL;
        const password = process.env.OWNER_PASSWORD;
        if (!email) {
            throw new AppError_1.default(http_status_codes_1.default.INTERNAL_SERVER_ERROR, "OWNER_EMAIL is not defined in .env");
        }
        if (!password) {
            throw new AppError_1.default(http_status_codes_1.default.INTERNAL_SERVER_ERROR, "OWNER_PASSWORD is not defined in .env");
        }
        const isOwnerExist = yield db_1.prisma.user.findFirst({
            where: { email, role: "owner" },
        });
        if (isOwnerExist) {
            console.log("Owner already exist.");
            return;
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, Number(process.env.BCRYPT_SALT_ROUND));
        const payload = {
            name: "Shipan Mallik",
            email,
            password: hashedPassword,
            role: "owner",
        };
        yield db_1.prisma.user.create({
            data: payload,
        });
        console.log("Owner created successfully!");
    }
    catch (error) {
        console.error("Error while seeding owner:", error);
    }
});
exports.seedOwner = seedOwner;
//# sourceMappingURL=seedOwner.js.map