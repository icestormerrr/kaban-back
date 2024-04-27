import express from "express";
import { body } from "express-validator";

import { taskController } from "../controllers/TaskController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

/**
 * Express router for task-related endpoints
 * @name taskRouter
 * @memberof module:Task
 */
export const taskRouter = express.Router();

/**
 * Route for retrieving a task
 * @memberof module:Task
 * @name GET /tasks
 * @function
 * @middleware authMiddleware
 * @returns {Object} - Task information
 */
taskRouter.get("/", authMiddleware, taskController.getTask);

/**
 * Route for retrieving tasks in grid format
 * @memberof module:Task
 * @name GET /tasks/grid
 * @function
 * @middleware authMiddleware
 * @returns {Object} - List of tasks in grid format
 */
taskRouter.get("/grid", authMiddleware, taskController.getTasksGrid);

/**
 * Route for creating a new task
 * @memberof module:Task
 * @name POST /tasks
 * @function
 * @middleware authMiddleware
 * @param {string} name - Task name (1-255 characters)
 * @param {string} description - Task description (1-1000 characters)
 * @returns {Object} - Created task information
 */
taskRouter.post(
  "/",
  authMiddleware,
  body("name").isLength({ min: 1, max: 255 }),
  body("description").isLength({ min: 1, max: 1000 }),
  taskController.createTask,
);

/**
 * Route for updating an existing task
 * @memberof module:Task
 * @name PUT /tasks
 * @function
 * @middleware authMiddleware
 * @param {string} name - Task name (1-255 characters)
 * @param {string} description - Task description (1-1000 characters)
 * @returns {Object} - Updated task information
 */
taskRouter.put(
  "/",
  authMiddleware,
  body("name").isLength({ min: 1, max: 255 }),
  body("description").isLength({ min: 1, max: 1000 }),
  taskController.updateTask,
);

/**
 * Route for deleting a task
 * @memberof module:Task
 * @name DELETE /tasks
 * @function
 * @middleware authMiddleware
 * @returns {Object} - Deletion information
 */
taskRouter.delete("/", authMiddleware, taskController.deleteTask);
