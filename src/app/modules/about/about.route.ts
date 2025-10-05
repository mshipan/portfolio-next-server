import { Router } from "express";
import { AboutController } from "./about.controller";

const router = Router();

router.post("/", AboutController.createOrUpdateAbout);
router.get("/", AboutController.getAbout);
router.delete("/experience/:id", AboutController.deleteExperience);
router.delete("/education/:id", AboutController.deleteEducation);

export const AboutRoutes = router;
