import { Router } from "express";
import { multerConfig } from "../../../configs/multer";
import { validateRequest } from "../../../middlewares/validateRequest";
import { blogValidationSchema } from "./blog,validation";
import { BlogController } from "./blog.controller";

export const blogRouter = Router();

blogRouter.post(
  "/create",
  multerConfig.fields([
    { name: "poster", maxCount: 1 },
    { name: "galleries", maxCount: 5 },
  ]),
  validateRequest(blogValidationSchema),
  BlogController.createBlog
);

blogRouter.get("/", BlogController.getAllBlogs);

blogRouter.get("/:slug", BlogController.getBlog);

blogRouter.patch("/publish/:slug", BlogController.togglePublishBlog);

blogRouter.patch("/:slug", BlogController.updateBlog);
