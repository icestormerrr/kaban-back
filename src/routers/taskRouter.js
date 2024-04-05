import express from "express";

import { taskController } from "../controllers/TaskController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const taskRouter = express.Router();

taskRouter.get("/", authMiddleware, taskController.getTasks);
taskRouter.post("/", authMiddleware, taskController.createTask);
taskRouter.put("/", authMiddleware, taskController.updateTask);
taskRouter.delete("/:id", authMiddleware, taskController.deleteTask);
