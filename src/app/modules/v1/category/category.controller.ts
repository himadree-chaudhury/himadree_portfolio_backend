import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { asyncTryCatch } from "../../../utils/asyncTryCatch";
import { genericResponse } from "../../../utils/genericResponse";
import { categoryService } from "./category.service";

const createCategory = asyncTryCatch(async (req: Request, res: Response) => {
    await categoryService.createCategory(req.body);
  genericResponse(res, {
    success: true,
    status: httpStatus.CREATED,
    message: "Category created successfully",
    data: null,
  });
});

export const categoryController = {
  createCategory,
};
