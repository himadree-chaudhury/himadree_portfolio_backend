import { Router } from "express";
import { multerConfig } from "../../../configs/multer";
import { validateRequest } from "../../../middlewares/validateRequest";
import { projectController } from "./project.controller";
import { createProjectSchema } from "./project.validation";

export const projectRouter = Router();

projectRouter.post(
  "/create",
  multerConfig.fields([
    { name: "poster", maxCount: 1 },
    { name: "galleries", maxCount: 5 },
  ]),
  validateRequest(createProjectSchema),
  projectController.createProject
);

projectRouter.get("/", projectController.getAllProjects);

projectRouter.get("/:slug", projectController.getProject);
