import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { asyncTryCatch } from "../../../utils/asyncTryCatch";
import { genericResponse } from "../../../utils/genericResponse";
import { blogService } from "./blog.service";

const createBlog = asyncTryCatch(async (req: Request, res: Response) => {
  const files = req.files as {
    poster?: Express.Multer.File[];
    galleries?: Express.Multer.File[];
  };

  const poster = files?.poster?.[0].path || "";
  const galleries = files?.galleries || [];
  await blogService.createBlog(req.body, poster, galleries);
  genericResponse(res, {
    success: true,
    status: httpStatus.CREATED,
    message: "Blog created successfully",
  });
});

const getAllBlogs = asyncTryCatch(async (req: Request, res: Response) => {
  const blogs = await blogService.getAllBlogs();
  genericResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Blogs fetched successfully",
    data: blogs,
  });
});

const getBlog = asyncTryCatch(async (req: Request, res: Response) => {
  const blogSlug = req.params.slug;
  const blog = await blogService.getBlog(blogSlug);
  genericResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Blog fetched successfully",
    data: blog,
  });
});

const togglePublishBlog = asyncTryCatch(async (req: Request, res: Response) => {
  const blogSlug = req.params.slug;
  await blogService.togglePublishBlog(blogSlug);
  genericResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Blog publication status toggled successfully",
  });
});

const updateBlog = asyncTryCatch(async (req: Request, res: Response) => {
  const blogSlug = req.params.slug;
  const payload = req.body;
  await blogService.updateBlog(blogSlug, payload);
  genericResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Blog updated successfully",
  });
});

export const BlogController = {
  createBlog,
  getAllBlogs,
  getBlog,
  togglePublishBlog,
  updateBlog,
};
