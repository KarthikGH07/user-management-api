import express from "express";
import { register, login, refreshToken } from "@/controllers/auth.controller";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/token/refresh", refreshToken);

export default router;
