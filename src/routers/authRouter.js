import { Router } from "express";
import { body } from "express-validator";

import { authController } from "../controllers/AuthController.js";

/**
 * Express router for authentication-related endpoints
 * @name authRouter
 * @memberof module:Authorization
 */
export const authRouter = new Router();

/**
 * Route for user registration
 * @memberof module:Authorization
 * @name POST /auth/register
 * @function
 * @param {string} email - User's email address
 * @param {string} password - User's password (3-32 characters)
 * @returns {Object} - New user information with a refresh token cookie
 */
authRouter.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  authController.register,
);

/**
 * Route for user login
 * @memberof module:Authorization
 * @name POST /auth/login
 * @function
 * @returns {Object} - User information with a refresh token cookie
 */
authRouter.post("/login", authController.login);

/**
 * Route for user logout
 * @memberof module:Authorization
 * @name POST /auth/logout
 * @function
 * @returns {Object} - Empty response, clears refresh token cookie
 */
authRouter.post("/logout", authController.logout);

/**
 * Route for refreshing user's access token
 * @memberof module:Authorization
 * @name GET /auth/refresh
 * @function
 * @returns {Object} - User information with a new refresh token cookie
 */
authRouter.get("/refresh", authController.refresh);
