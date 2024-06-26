import express from "express";

import { userController } from "../controllers/UserController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const userRouter = express.Router();

userRouter.get("/", authMiddleware, userController.getUsers);

userRouter.get("/current", authMiddleware, userController.getCurrentUser);

userRouter.delete("/", authMiddleware, userController.deleteUser);
