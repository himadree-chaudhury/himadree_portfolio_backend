import { Router } from "express";
import { validateRequest } from "../../../middlewares/validateRequest";
import { categoryController } from "./category.controller";
import { createCategorySchema } from "./category.validation";

export const categoryRouter = Router();

categoryRouter.post(
  "/create",
  validateRequest(createCategorySchema),
  categoryController.createCategory
);
