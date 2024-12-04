import * as UserModel from "@/models/userModel";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
} from "@/utils/jwt";
import { hashPassword, verifyPassword } from "@/utils/password";
import { Request, Response } from "express";

const register = (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!!name && !!email && !!password) {
    const { hash } = hashPassword(password);
    UserModel.createUser(name, email, hash.toString("hex"));
    res.status(200).json({ message: "Registered" });
  } else {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

const login = (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!!email && !!password) {
    const user: any = UserModel.getUser(email);
    const validPassword = verifyPassword(
      password,
      user.password.toString("hex")
    );
    if (validPassword) {
      const token = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      res
        .status(200)
        .json({ message: "Logged in", accessToken: token, refreshToken });
    } else {
      res.status(401).json({ messsage: "Invalid email or password" });
    }
  }
};

const refreshToken = (req: Request, res: Response) => {
  const token = req.body.refreshToken;

  if (!refreshToken) {
    res.sendStatus(401);
    return;
  }

  const result = verifyAccessToken(token);

  if (!result.success) {
    res.status(403).json({ error: result.error });
  }

  const user = result.data;
  const newAccessToken = generateAccessToken(user);
  res.json({ accessToken: newAccessToken });
};

export { register, login, refreshToken };
