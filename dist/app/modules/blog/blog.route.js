"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoutes = void 0;
const express_1 = require("express");
const blog_controller_1 = require("./blog.controller");
const multer_config_1 = require("../../config/multer.config");
const checkAuth_1 = require("../../middlewares/checkAuth");
const router = (0, express_1.Router)();
router.get("/", blog_controller_1.BlogController.getAllBlogs);
router.get("/:slug", blog_controller_1.BlogController.getSingleBlog);
router.post("/", multer_config_1.multerUpload.single("file"), (0, checkAuth_1.checkAuth)("owner"), blog_controller_1.BlogController.createBlog);
router.patch("/:slug", multer_config_1.multerUpload.single("file"), (0, checkAuth_1.checkAuth)("owner"), blog_controller_1.BlogController.updateBlog);
router.delete("/:slug", (0, checkAuth_1.checkAuth)("owner"), blog_controller_1.BlogController.deleteBlog);
exports.BlogRoutes = router;
//# sourceMappingURL=blog.route.js.map