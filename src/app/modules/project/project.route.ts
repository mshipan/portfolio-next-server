import { Router } from "express";
import { ProjectController } from "./project.controller";

const router = Router();

router.get("/", ProjectController.getAllProjects);
router.get("/:slug", ProjectController.getSingleProject);
router.post("/", ProjectController.createProject);
router.patch("/:slug", ProjectController.updateProject);
router.delete("/:slug", ProjectController.deleteProject);

export const ProjectRoutes = router;
