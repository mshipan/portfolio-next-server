import { Router } from "express";
import { BlogController } from "./blog.controller";

const router = Router();

router.get("/", BlogController.getAllBlogs);
router.get("/:slug", BlogController.getSingleBlog);
router.post("/", BlogController.createBlog);
router.patch("/:slug", BlogController.updateBlog);
router.delete("/:slug", BlogController.deleteBlog);

export const BlogRoutes = router;
