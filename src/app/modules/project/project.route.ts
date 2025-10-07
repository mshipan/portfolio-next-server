import { Router } from "express";
import { ProjectController } from "./project.controller";
import { multerUpload } from "../../config/multer.config";
import { checkAuth } from "../../middlewares/checkAuth";

const router = Router();

router.get("/", ProjectController.getAllProjects);
router.get("/:slug", ProjectController.getSingleProject);
router.post(
  "/",
  multerUpload.single("file"),
  checkAuth("owner"),
  ProjectController.createProject
);
router.patch(
  "/:slug",
  multerUpload.single("file"),
  checkAuth("owner"),
  ProjectController.updateProject
);
router.delete("/:slug", checkAuth("owner"), ProjectController.deleteProject);

export const ProjectRoutes = router;
