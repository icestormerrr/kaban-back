import { Router } from "express";
import { body } from "express-validator";

import { authController } from "../controllers/AuthController.js";

export const authRouter = new Router();

authRouter.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  authController.register,
);
authRouter.post("/login", authController.login);
authRouter.post("/logout", authController.logout);
authRouter.get("/refresh", authController.refresh);
