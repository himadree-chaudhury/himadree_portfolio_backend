import { Router } from "express";
import { multerConfig } from "../../../configs/multer";
import { validateRequest } from "../../../middlewares/validateRequest";
import { caseStudyController } from "./case.controller";
import { createCaseStudySchema } from "./case.validation";

export const caseRouter = Router();

caseRouter.post(
  "/create",
  multerConfig.fields([
    { name: "poster", maxCount: 1 },
    { name: "galleries", maxCount: 5 },
  ]),
  validateRequest(createCaseStudySchema),
  caseStudyController.createCaseStudy
);

caseRouter.get("/", caseStudyController.getAllCaseStudies);

caseRouter.get("/:slug", caseStudyController.getCaseStudy);
