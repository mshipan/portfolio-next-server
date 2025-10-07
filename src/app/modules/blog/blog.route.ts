import { Router } from "express";
import { BlogController } from "./blog.controller";
import { multerUpload } from "../../config/multer.config";
import { checkAuth } from "../../middlewares/checkAuth";

const router = Router();

router.get("/", BlogController.getAllBlogs);
router.get("/:slug", BlogController.getSingleBlog);
router.post(
  "/",
  multerUpload.single("file"),
  checkAuth("owner"),
  BlogController.createBlog
);
router.patch(
  "/:slug",
  multerUpload.single("file"),
  checkAuth("owner"),
  BlogController.updateBlog
);
router.delete("/:slug", checkAuth("owner"), BlogController.deleteBlog);

export const BlogRoutes = router;
