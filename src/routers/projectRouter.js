import express from "express";
import { body } from "express-validator";

import { projectController } from "../controllers/ProjectController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

/**
 * Express router for project-related endpoints
 * @name projectRouter
 * @memberof module:Project
 */
export const projectRouter = express.Router();

/**
 * Route for retrieving projects
 * @memberof module:Project
 * @name GET /projects
 * @function
 * @middleware authMiddleware
 * @returns {Object} - List of projects
 */
projectRouter.get("/", authMiddleware, projectController.getProjects);

/**
 * Route for creating a new project
 * @memberof module:Project
 * @name POST /projects
 * @function
 * @middleware authMiddleware
 * @param {string} name - Project name (1-255 characters)
 * @param {string} description - Project description (1-1000 characters)
 * @returns {Object} - Created project information
 */
projectRouter.post(
  "/",
  authMiddleware,
  body("name").isLength({ min: 1, max: 255 }),
  body("description").isLength({ min: 1, max: 1000 }),
  projectController.createProject,
);

/**
 * Route for updating an existing project
 * @memberof module:Project
 * @name PUT /projects
 * @function
 * @middleware authMiddleware
 * @param {string} name - Project name (1-255 characters)
 * @param {string} description - Project description (1-1000 characters)
 * @returns {Object} - Updated project information
 */
projectRouter.put(
  "/",
  authMiddleware,
  body("name").isLength({ min: 1, max: 255 }),
  body("description").isLength({ min: 1, max: 1000 }),
  projectController.updateProject,
);

/**
 * Route for deleting a project
 * @memberof module:Project
 * @name DELETE /projects
 * @function
 * @middleware authMiddleware
 * @returns {Object} - Deletion information
 */
projectRouter.delete("/", authMiddleware, projectController.deleteProject);
