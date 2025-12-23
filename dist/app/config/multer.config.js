"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerUpload = void 0;
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const cloudinary_config_1 = require("./cloudinary.config");
const multer_1 = __importDefault(require("multer"));
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_config_1.cloudinaryUpload,
    params: {
        public_id: (req, file) => {
            var _a;
            const originalName = file.originalname;
            const nameWithoutExt = originalName.substring(0, originalName.lastIndexOf(".")) ||
                originalName;
            const extension = ((_a = originalName.split(".").pop()) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || "file";
            const fileName = nameWithoutExt
                .toLowerCase()
                .trim()
                .replace(/\s+/g, "-")
                .replace(/\.+/g, "-")
                .replace(/[^a-z0-9-_]/g, "")
                .replace(/-+/g, "-")
                .replace(/^[-_]+|[-_]+$/g, "")
                .slice(0, 50) || "file";
            const uniqueFileName = Math.random().toString(36).substring(2) +
                "-" +
                Date.now() +
                "-" +
                fileName +
                "." +
                extension;
            return uniqueFileName;
        },
    },
});
exports.multerUpload = (0, multer_1.default)({ storage: storage });
//# sourceMappingURL=multer.config.js.map