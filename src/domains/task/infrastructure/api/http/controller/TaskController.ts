import { NextFunction, Request, Response, Router } from "express";

import HttpError from "../../../../../../common/http/exceptions/HttpError";
import { ITaskService } from "../../../../core/service/TaskService";
import { taskService } from "../../../../core/di";
import { Task } from "../../../../core/model/Task";
import { TaskGridItemDto } from "../dtos/TaskGridItemDto";
import { IProjectService } from "../../../../../project/core/service/ProjectService";

import { IUserService } from "../../../../../user/core/service/UserService";
import { projectService } from "../../../../../project/core/di";
import { userService } from "../../../../../user/core/di";
import { authMiddleware } from "../../../../../../common/http/middlewares/authMiddleware";
import { Project } from "../../../../../project/core/model/Project";
import { TaskFilter } from "../../../../core/model/TaskFilter";

export class TaskController {
  constructor(
    private taskService: ITaskService,
    private projectService: IProjectService,
    private userService: IUserService,
  ) {}

  async getTaskGrid(request: Request, response: Response, next: NextFunction) {
    try {
      const { projectId } = request.query;
      if (typeof projectId !== "string") throw HttpError.BadRequestError("Required parameter projectId was not passed");

      const project = await this.projectService.getById(projectId);
      if (!project) throw HttpError.BadRequestError("Project with this id was not found");

      const filter = this.createFilterFromRequest(request, project);

      const tasks = await this.taskService.getAllByFilter(filter);
      const users = await this.userService.getByIds(project.users);

      return response.json(tasks.map((t) => new TaskGridItemDto(t, project, users)));
    } catch (e) {
      next(e);
    }
  }
  private createFilterFromRequest(request: Request, project: Project) {
    const { projectId } = request.query;

    const filter: TaskFilter = { projectId: projectId as string };
    const knownProperties = [
      "epicId",
      "sprintId",
      "executorId",
      "name",
      ...project.customFields.map((field) => field.id),
    ];

    for (const prop in request.query) {
      if (knownProperties.includes(prop)) filter[prop] = request.query[prop];
    }

    return filter;
  }

  async getById(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;
      if (!id) throw HttpError.BadRequestError("Required param id is missing");

      const task = await this.taskService.getById(id);
      if (!task) throw HttpError.NotFoundError("Task not found");

      return response.json(task);
    } catch (e) {
      next(e);
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const taskToCreate = request.body;
      const errors = await this.taskService.validate(taskToCreate);
      if (errors.length) {
        throw HttpError.BadRequestError("Task has invalid format", errors);
      }

      const createdTask = await this.taskService.create(taskToCreate);
      return response.json(createdTask);
    } catch (e) {
      next(e);
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const taskToUpdate = request.body;
      const errors = await this.taskService.validate(taskToUpdate);
      if (errors.length) {
        throw HttpError.BadRequestError("Task has invalid format", errors);
      }

      const updatedTask = await this.taskService.update(taskToUpdate);
      return response.json(updatedTask);
    } catch (e) {
      next(e);
    }
  }
}

const taskController = new TaskController(taskService, projectService, userService);
export const taskRouter = Router();
taskRouter.get("/grid", authMiddleware, taskController.getTaskGrid.bind(taskController));
taskRouter.get("/:id", authMiddleware, taskController.getById.bind(taskController));
taskRouter.post("/", authMiddleware, taskController.create.bind(taskController));
taskRouter.put("/", authMiddleware, taskController.update.bind(taskController));
