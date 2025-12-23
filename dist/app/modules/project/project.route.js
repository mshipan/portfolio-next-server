"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRoutes = void 0;
const express_1 = require("express");
const project_controller_1 = require("./project.controller");
const multer_config_1 = require("../../config/multer.config");
const checkAuth_1 = require("../../middlewares/checkAuth");
const router = (0, express_1.Router)();
router.get("/", project_controller_1.ProjectController.getAllProjects);
router.get("/:slug", project_controller_1.ProjectController.getSingleProject);
router.post("/", multer_config_1.multerUpload.single("file"), (0, checkAuth_1.checkAuth)("owner"), project_controller_1.ProjectController.createProject);
router.patch("/:slug", multer_config_1.multerUpload.single("file"), (0, checkAuth_1.checkAuth)("owner"), project_controller_1.ProjectController.updateProject);
router.delete("/:slug", (0, checkAuth_1.checkAuth)("owner"), project_controller_1.ProjectController.deleteProject);
exports.ProjectRoutes = router;
//# sourceMappingURL=project.route.js.map