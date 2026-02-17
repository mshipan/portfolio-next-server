import { Router } from "express";
import { AboutController } from "./about.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { multerUpload } from "../../config/multer.config";

const router = Router();

router.post(
  "/",
  multerUpload.single("file"),
  checkAuth("owner"),
  AboutController.createOrUpdateAbout
);
router.post(
  "/skill",
  checkAuth("owner"),
  multerUpload.single("file"),
  AboutController.createSkill
);
router.post(
  "/experience",
  checkAuth("owner"),
  AboutController.createExperience
);
router.post("/education", checkAuth("owner"), AboutController.createEducation);

router.get("/", AboutController.getAbout);
router.get("/skill", AboutController.getAllSkills);
router.get("/experience", AboutController.getAllExperiences);
router.get("/education", AboutController.getAllEducations);

router.patch("/photo", checkAuth("owner"), multerUpload.single("file"), AboutController.updateAboutPhoto)

router.patch("/skill/:id", checkAuth("owner"), multerUpload.single("file"), AboutController.updateSkill);

router.patch("/experience/:id", checkAuth("owner"), AboutController.updateExperience);

router.patch("/education/:id", checkAuth("owner"), AboutController.updateEducation);


router.delete("/skill/:id", checkAuth("owner"), AboutController.deleteSkill);
router.delete(
  "/experience/:id",
  checkAuth("owner"),
  AboutController.deleteExperience
);
router.delete(
  "/education/:id",
  checkAuth("owner"),
  AboutController.deleteEducation
);

export const AboutRoutes = router;
