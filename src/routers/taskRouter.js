import express from "express";
import { body } from "express-validator";

import { taskController } from "../controllers/TaskController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const taskRouter = express.Router();

taskRouter.get("/", authMiddleware, taskController.getTask);

taskRouter.get("/grid", authMiddleware, taskController.getTasksGrid);

taskRouter.post(
  "/",
  authMiddleware,
  body("name").isLength({ min: 1, max: 255 }),
  body("description").isLength({ min: 1, max: 1000 }),
  taskController.createTask,
);

taskRouter.put(
  "/",
  authMiddleware,
  body("name").isLength({ min: 1, max: 255 }),
  body("description").isLength({ min: 1, max: 1000 }),
  taskController.updateTask,
);

taskRouter.delete("/", authMiddleware, taskController.deleteTask);
