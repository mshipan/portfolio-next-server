import { Router } from "express";
import { ProjectController } from "./project.controller";
import { multerUpload } from "../../config/multer.config";

const router = Router();

router.get("/", ProjectController.getAllProjects);
router.get("/:slug", ProjectController.getSingleProject);
router.post("/", multerUpload.single("file"), ProjectController.createProject);
router.patch(
  "/:slug",
  multerUpload.single("file"),
  ProjectController.updateProject
);
router.delete("/:slug", ProjectController.deleteProject);

export const ProjectRoutes = router;
