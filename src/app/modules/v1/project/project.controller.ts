import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { asyncTryCatch } from "../../../utils/asyncTryCatch";
import { genericResponse } from "../../../utils/genericResponse";
import { projectService } from "./project.service";

const createProject = asyncTryCatch(async (req: Request, res: Response) => {
  const files = req.files as {
    poster?: Express.Multer.File[];
    galleries?: Express.Multer.File[];
  };

  const poster = files?.poster?.[0].path || "";
  const galleries = files?.galleries || [];

  await projectService.createProject(req.body, poster, galleries);
  genericResponse(res, {
    success: true,
    status: httpStatus.CREATED,
    message: "Project created successfully",
  });
});

const getAllProjects = asyncTryCatch(async (req: Request, res: Response) => {
  const projects = await projectService.getAllProjects();
  genericResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Projects fetched successfully",
    data: projects,
  });
});

const getProject = asyncTryCatch(async (req: Request, res: Response) => {
  const projectSlug = req.params.slug;
  const project = await projectService.getProject(projectSlug);
  genericResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Project fetched successfully",
    data: project,
  });
});

export const projectController = {
  createProject,
  getAllProjects,
  getProject,
};
