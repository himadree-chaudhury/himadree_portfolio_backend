import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { asyncTryCatch } from "../../../utils/asyncTryCatch";
import { genericResponse } from "../../../utils/genericResponse";
import { userService } from "./user.service";

const credentialRegister = asyncTryCatch(
  async (req: Request, res: Response) => {
    await userService.credentialRegister(req.body);
    genericResponse(res, {
      success: true,
      status: httpStatus.CREATED,
      message: "User registered successfully",
      data: null,
    });
  }
);

const getAllUsers = asyncTryCatch(async (req: Request, res: Response) => {
  res.send("Get All Users");
});

export const userController = {
  credentialRegister,
  getAllUsers,
};
