import { verifyAccessToken } from "@/utils/jwt";
import { NextFunction, Request, Response } from "express";

export const verifyJWT = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    res.sendStatus(401);
    return;
  }

  try {
    const result = verifyAccessToken(token);
    if (result.success) {
      next();
    } else {
      res.status(401).json({ message: "Invalid token" });
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
