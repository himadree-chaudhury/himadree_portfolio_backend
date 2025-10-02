import { Request, Response } from "express";
import { asyncTryCatch } from "../../../utils/asyncTryCatch";

const credentialRegister = asyncTryCatch(
  async (req: Request, res: Response) => {
    res.send("Register User");
  }
);

const getAllUsers = asyncTryCatch(async (req: Request, res: Response) => {
  res.send("Get All Users");
});

export const userController = {
  credentialRegister,
  getAllUsers,
};
