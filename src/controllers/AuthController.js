import { validationResult } from "express-validator";

import ApiError from "../exceptions/ApiError.js";
import { authService } from "../services/AuthService.js";

const cookieOptions = {
  maxAge: 30 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  secure: true,
  sameSite: "none",
  path: "/",
};

class AuthController {
  async register(req, res, next) {
    try {
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        next(ApiError.BadRequestError("Ошибки валидации", validationErrors.array()));
      }
      const { email, password, name } = req.body;
      const newUser = await authService.register(email, password, name);

      return res.cookie("refreshToken", newUser.refreshToken, cookieOptions).json(newUser);
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await authService.login(email, password);

      return res.cookie("refreshToken", user.refreshToken, cookieOptions).json(user);
    } catch (err) {
      next(err);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      await authService.logout(refreshToken);
      res.clearCookie("refreshToken");
      res.status(200).json();
    } catch (err) {
      next(err);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const user = await authService.refresh(refreshToken);

      return res.cookie("refreshToken", user.refreshToken, cookieOptions).json(user);
    } catch (err) {
      next(err);
    }
  }
}

export const authController = new AuthController();
