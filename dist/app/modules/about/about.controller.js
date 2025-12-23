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
exports.AboutController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const about_service_1 = require("./about.service");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const createOrUpdateAbout = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    req.body = JSON.parse(req.body.data) || req.body;
    const payload = Object.assign(Object.assign({}, req.body), { photo: (_a = req.file) === null || _a === void 0 ? void 0 : _a.path });
    const about = yield about_service_1.AboutServices.createOrUpdateAbout(payload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "About section created / updated successfully.",
        data: about,
    });
}));
const getAbout = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const about = yield about_service_1.AboutServices.getAbout();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "About section retrieved successfully.",
        data: about,
    });
}));
const createSkill = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    req.body = JSON.parse(req.body.data) || req.body;
    const payload = Object.assign(Object.assign({}, req.body), { photo: (_a = req.file) === null || _a === void 0 ? void 0 : _a.path });
    const skill = yield about_service_1.AboutServices.createSkill(payload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "Skill created successfully.",
        data: skill,
    });
}));
const getAllSkills = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const skills = yield about_service_1.AboutServices.getAllSkills();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Skills retrieved successfully.",
        data: skills,
    });
}));
const deleteSkill = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield about_service_1.AboutServices.deleteSkill(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: result.message,
        data: null,
    });
}));
const createExperience = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const experience = yield about_service_1.AboutServices.createExperience(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "Experience created successfully.",
        data: experience,
    });
}));
const getAllExperiences = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const experience = yield about_service_1.AboutServices.getAllExperiences();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Experiences retrieved successfully.",
        data: experience,
    });
}));
const deleteExperience = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield about_service_1.AboutServices.deleteExperience(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: result.message,
        data: null,
    });
}));
const createEducation = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const education = yield about_service_1.AboutServices.createEducation(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "Education created successfully.",
        data: education,
    });
}));
const getAllEducations = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const education = yield about_service_1.AboutServices.getAllEducations();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Education retrieved successfully.",
        data: education,
    });
}));
const deleteEducation = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield about_service_1.AboutServices.deleteEducation(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: result.message,
        data: null,
    });
}));
exports.AboutController = {
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
//# sourceMappingURL=about.controller.js.map