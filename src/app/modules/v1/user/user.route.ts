import { Router } from "express";
import { validateRequest } from "../../../middlewares/validateRequest";
import { userController } from "./user.controller";
import { userValidationSchema } from "./user.validation";

export const userRouter = Router();

userRouter.post(
  "/register",
  validateRequest(userValidationSchema),
  userController.credentialRegister
);
userRouter.get("/", userController.getAllUsers);
