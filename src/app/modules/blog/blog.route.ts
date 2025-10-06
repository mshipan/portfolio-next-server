import { Router } from "express";
import { BlogController } from "./blog.controller";
import { multerUpload } from "../../config/multer.config";

const router = Router();

router.get("/", BlogController.getAllBlogs);
router.get("/:slug", BlogController.getSingleBlog);
router.post("/", multerUpload.single("file"), BlogController.createBlog);
router.patch("/:slug", multerUpload.single("file"), BlogController.updateBlog);
router.delete("/:slug", BlogController.deleteBlog);

export const BlogRoutes = router;
