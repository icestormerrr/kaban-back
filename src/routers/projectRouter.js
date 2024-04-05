import express from "express";

import { projectController } from "../controllers/ProjectController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const projectRouter = express.Router();

projectRouter.get("/", authMiddleware, projectController.getProjects);

projectRouter.post("/", authMiddleware, projectController.createProject);

projectRouter.put("/", authMiddleware, projectController.updateProject);

projectRouter.delete("/", authMiddleware, projectController.deleteProject);
