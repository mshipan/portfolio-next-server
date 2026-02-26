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
const updateAboutPhoto = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const photo = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
    if (!photo) {
        return res.status(http_status_codes_1.default.BAD_REQUEST).json({
            success: false,
            message: "Photo is required",
        });
    }
    const result = yield about_service_1.AboutServices.updateAboutPhoto(photo);
    res.status(http_status_codes_1.default.OK).json({
        success: true,
        message: "Profile photo updated successfully",
        data: result,
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
    const skills = yield about_service_1.AboutServices.getAllSkills(req.query);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Skills retrieved successfully.",
        data: skills.data,
        meta: skills.meta,
    });
}));
const updateSkill = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    req.body = JSON.parse(req.body.data) || req.body;
    const payload = Object.assign(Object.assign({}, req.body), { photo: (_a = req.file) === null || _a === void 0 ? void 0 : _a.path });
    const result = yield about_service_1.AboutServices.updateSkill(id, payload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Skill updated successfully.",
        data: result,
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
    const result = yield about_service_1.AboutServices.getAllExperiences(req.query);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Experiences retrieved successfully.",
        meta: result.meta,
        data: result.data,
    });
}));
const updateExperience = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield about_service_1.AboutServices.updateExperience(id, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Experience updated successfully.",
        data: result,
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
    const result = yield about_service_1.AboutServices.getAllEducations(req.query);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Educations retrieved successfully.",
        meta: result.meta,
        data: result.data,
    });
}));
const updateEducation = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield about_service_1.AboutServices.updateEducation(id, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Education updated successfully.",
        data: result,
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
//# sourceMappingURL=about.controller.js.map