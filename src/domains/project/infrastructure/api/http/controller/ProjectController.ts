import { NextFunction, Request, Response, Router } from "express";

import HttpError from "../../../../../../common/http/exceptions/HttpError";
import { IProjectService } from "../../../../core/service/ProjectService";
import { projectService } from "../../../../core/di";
import { Project } from "../../../../core/model/Project";
import { ProjectShortDto } from "../dtos/ProjectShortDto";
import { authMiddleware } from "../../../../../../common/http/middlewares/authMiddleware";

export class ProjectController {
  constructor(private projectService: IProjectService) {}

  async getAll(request: Request, response: Response, next: NextFunction) {
    try {
      const { userId } = request.query;
      if (typeof userId !== "string") throw HttpError.BadRequestError("Required param userId was not passed");

      const projects = await this.projectService.getAllByUser(userId);
      return response.json(projects);
    } catch (e) {
      next(e);
    }
  }

  async getById(request: Request, response: Response, next: NextFunction) {
    const { _id } = request.params;
    if (!_id) throw HttpError.BadRequestError("Required param _id was not passed");

    const project = await this.projectService.getById(_id);
    if (!project) throw HttpError.NotFoundError("Project with this _id does not exist");

    return response.json(project);
  }

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const projectToCreate = request.body;
      const errors = await projectService.validate(projectToCreate);
      if (errors.length) {
        throw HttpError.BadRequestError("Project has invalid format", errors);
      }

      const createdProject = await this.projectService.create(projectToCreate);
      return response.json(createdProject);
    } catch (e) {
      next(e);
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const projectToUpdate = request.body;
      const errors = await projectService.validate(projectToUpdate);
      if (errors.length) {
        throw HttpError.BadRequestError("Project has invalid format", errors);
      }

      const updatedProject = await this.projectService.update(projectToUpdate);
      return response.json(updatedProject);
    } catch (e) {
      next(e);
    }
  }
}

const projectController = new ProjectController(projectService);
export const projectRouter = Router();
projectRouter.get("/", authMiddleware, projectController.getAll.bind(projectController));
projectRouter.get("/:_id", authMiddleware, projectController.getById.bind(projectController));
projectRouter.post("/", authMiddleware, projectController.create.bind(projectController));
projectRouter.put("/", authMiddleware, projectController.update.bind(projectController));
