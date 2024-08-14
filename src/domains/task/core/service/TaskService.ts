import { ITaskRepository } from "../repository/ITaskRepository";
import { Task } from "../model/Task";
import { IUserService } from "../../../user/core/service/UserService";
import { IProjectService } from "../../../project/core/service/ProjectService";
import { TaskStatus } from "../model/TaskStatus";
import { TaskFilter } from "../model/TaskFilter";

export interface ITaskService {
  getAllByProject(filter: TaskFilter): Promise<Task[]>;
  getCriticalTasks(): Promise<Task[]>;
  getById(id: string): Promise<Task | null>;
  create(task: Task): Promise<Task>;
  update(task: Task): Promise<Task | null>;
  deleteById(id: string): Promise<void>;
  validate(task: Task): Promise<string[]>;
}

export class TaskService implements ITaskService {
  constructor(
    private taskRepository: ITaskRepository,
    private userService: IUserService,
    private projectService: IProjectService,
  ) {}

  async getAllByProject(filter: TaskFilter) {
    return await this.taskRepository.getAllByProject(filter);
  }

  async getCriticalTasks() {
    return await this.taskRepository.getAllByStatus(TaskStatus.Critical);
  }

  async getById(id: string) {
    return await this.taskRepository.getById(id);
  }

  async create(task: Task) {
    return await this.taskRepository.create({ ...task, creationDatetime: Date.now() });
  }
  async update(task: Task) {
    return await this.taskRepository.update(task);
  }
  async deleteById(id: string) {
    await this.taskRepository.deleteById(id);
  }

  async validate(task: any) {
    const errors: string[] = [];

    if (typeof task !== "object" || !task) {
      return ["Task is not object"];
    }

    if (typeof task.projectId !== "string") {
      return ["Task must be created in existing project"];
    }

    const project = await this.projectService.getById(task.projectId);
    if (!project) {
      return ["Task must be created in existing project"];
    }

    if (typeof task.name === "string") {
      if (task.name.length < 3 || task.name.length > 255) {
        errors.push("Name length must be from 3 to 255 chars");
      }
    } else {
      errors.push("Required field name is empty");
    }

    if (typeof task.description === "string") {
      if (task.description.length < 1 || task.description.length > 1024) {
        errors.push("Description length must be from 1 to 1024 chars");
      }
    } else {
      errors.push("Required field description is empty");
    }

    if (!Object.values(TaskStatus).includes(task.status)) {
      errors.push("Invalid task status");
    }

    if (typeof task.epicId === "string") {
      if (!project.epics.map((e) => e.id).includes(task.epicId)) {
        errors.push("The listed epic do not exist in project");
      }
    } else {
      errors.push("Required field epic is empty");
    }

    if (typeof task.sprintId === "string") {
      if (!project.sprints.map((s) => s.id).includes(task.sprintId)) {
        errors.push("The listed sprint do not exist in project");
      }
    } else {
      errors.push("Required field sprint is empty");
    }

    if (typeof task.stageId === "string") {
      if (!project.stages.map((s) => s.id).includes(task.stageId)) {
        errors.push("The listed stage do not exist in project");
      }
    } else {
      errors.push("Required field stage is empty");
    }

    if (typeof task.authorId === "string") {
      const author = await this.userService.getById(task.authorId);
      if (!author) {
        errors.push("The listed author of the task does not exist");
      }
    } else {
      errors.push("Required field author is empty");
    }

    if (typeof task.executorId === "string") {
      const executor = await this.userService.getById(task.executorId);
      if (!executor) {
        errors.push("The listed executor of the task does not exist");
      }
    } else {
      errors.push("Required field executor is empty");
    }

    if (task.id?.length > 0)
      if (!!task.creationDatetime) {
        if (typeof task.creationDatetime !== "number") errors.push("Creation datetime has invalid format");
      } else {
        errors.push("Required field Creation datetime is empty");
      }

    if (task.planEndDatetime && typeof task.planEndDatetime !== "number") {
      errors.push("Plan end datetime has invalid format");
    }

    if (
      !!task.messages &&
      (!Array.isArray(task.messages) ||
        !task.messages.every(
          (message: any) =>
            typeof message.id === "string" &&
            typeof message.description === "string" &&
            message.description.length > 1 &&
            message.description.length < 512 &&
            typeof message.date === "number" &&
            typeof message.userId === "string",
        ))
    ) {
      errors.push("Comments format is invalid");
    }

    if (task.custom && typeof task.custom === "object") {
      for (const prop in task.custom) {
        if (!project.customFields.find((field) => field.id === prop)) {
          errors.push(`Property ${prop} with value ${task.custom[prop]} do not exist in project`);
        }
      }
    }

    return errors;
  }
}
