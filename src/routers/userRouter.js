import express from "express";

import { userController } from "../controllers/UserController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

/**
 * Express router for task-related endpoints
 * @name userRouter
 * @memberof module:User
 */
export const userRouter = express.Router();

/**
 * Route for retrieving users
 * @memberof module:User
 * @name GET /users
 * @function
 * @middleware authMiddleware
 * @returns {Object} - List of users
 */
userRouter.get("/", authMiddleware, userController.getUsers);

/**
 * Route for deleting a user
 * @memberof module:User
 * @name DELETE /users
 * @function
 * @middleware authMiddleware
 * @returns {Object} - Deletion information
 */
userRouter.delete("/", authMiddleware, userController.deleteUser);
