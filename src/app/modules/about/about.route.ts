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
router.get("/", AboutController.getAbout);
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
