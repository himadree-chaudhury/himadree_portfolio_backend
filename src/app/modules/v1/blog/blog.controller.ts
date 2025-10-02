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

export const BlogController = {
  createBlog,
};
