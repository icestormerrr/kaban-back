import express from "express";
import { body } from "express-validator";

import { projectController } from "../controllers/ProjectController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const projectRouter = express.Router();

projectRouter.get("/", authMiddleware, projectController.getProjects);

projectRouter.post(
  "/",
  authMiddleware,
  body("name").isLength({ min: 1, max: 255 }),
  body("description").isLength({ min: 1, max: 1000 }),
  projectController.createProject,
);

projectRouter.put(
  "/",
  authMiddleware,
  body("name").isLength({ min: 1, max: 255 }),
  body("description").isLength({ min: 1, max: 1000 }),
  projectController.updateProject,
);

projectRouter.delete("/", authMiddleware, projectController.deleteProject);
