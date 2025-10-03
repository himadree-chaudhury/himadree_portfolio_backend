import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { asyncTryCatch } from "../../../utils/asyncTryCatch";
import { genericResponse } from "../../../utils/genericResponse";
import { caseStudyService } from "./case.service";


const createCaseStudy = asyncTryCatch(async (req: Request, res: Response) => {
  const files = req.files as {
    poster?: Express.Multer.File[];
    galleries?: Express.Multer.File[];
  };

  const poster = files?.poster?.[0].path || "";
  const galleries = files?.galleries || [];

  await caseStudyService.createCaseStudy(req.body, poster, galleries);
  genericResponse(res, {
    success: true,
    status: httpStatus.CREATED,
    message: "Case study created successfully",
  });
});

const getAllCaseStudies = asyncTryCatch(async (req: Request, res: Response) => {
  const caseStudies = await caseStudyService.getAllCaseStudies();
  genericResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Case studies fetched successfully",
    data: caseStudies,
  });
});

const getCaseStudy = asyncTryCatch(async (req: Request, res: Response) => {
  const caseStudySlug = req.params.slug;
  const caseStudy = await caseStudyService.getCaseStudy(caseStudySlug);
  genericResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Case study fetched successfully",
    data: caseStudy,
  });
});

export const caseStudyController = {
  createCaseStudy,
  getAllCaseStudies,
  getCaseStudy,
};
