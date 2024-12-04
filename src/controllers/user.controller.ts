import { Request, Response } from "express";
import * as UserModel from "@/models/userModel";

const getAllUsers = (req: Request, res: Response) => {
  const users = UserModel.getAllUsers();
  res.status(200).json({ data: users });
};

export { getAllUsers };
