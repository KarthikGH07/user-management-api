import express from "express";
import { getAllUsers } from "@/controllers/user.controller";
import { verifyJWT } from "@/middleware/authMiddleware";

const router = express.Router();
router.get("/", verifyJWT, getAllUsers);

export default router;
