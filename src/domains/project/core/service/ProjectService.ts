import { IProjectRepository } from "../repository/IProjectRepository";
import { Project } from "../model/Project";
import { IUserService } from "../../../user/core/service/UserService";
import { Unknown } from "../../../../common/types/common";

export interface IProjectService {
  getById(id: string): Promise<Project | null>;
  getAllByUser(userId: string): Promise<Project[]>;
  create(project: Project): Promise<Project>;
  update(project: Project): Promise<Project | null>;
  deleteById(id: string): Promise<void>;
  validate(project: Project): Promise<string[]>;
}

export class ProjectService implements IProjectService {
  constructor(
    private projectRepository: IProjectRepository,
    private userService: IUserService,
  ) {}

  async getById(id: string) {
    return await this.projectRepository.getById(id);
  }
  async getAllByUser(userId: string) {
    return await this.projectRepository.getAllByUser(userId);
  }

  async create(project: Project) {
    return await this.projectRepository.create(project);
  }
  async update(project: Project) {
    return await this.projectRepository.update(project);
  }
  async deleteById(id: string) {
    await this.projectRepository.deleteById(id);
  }

  async validate(project: Unknown<Project> | null) {
    const errors: string[] = [];

    if (typeof project !== "object" || !project) {
      return ["Project is not object"];
    }

    if (typeof project.name === "string") {
      if (project.name.length < 3 || project.name.length > 255) {
        errors.push("Name length must be from 3 to 255 chars");
      }
    } else {
      errors.push("Required field name is empty");
    }

    if (typeof project.description === "string") {
      if (project.description.length < 1 || project.description.length > 1024) {
        errors.push("Description length must be from 1 to 1024 chars");
      }
    } else {
      errors.push("Required field description is empty");
    }

    if (typeof project.authorId === "string") {
      const author = await this.userService.getById(project.authorId);
      if (!author) {
        errors.push("The listed author of the project does not exist");
      }
    } else {
      errors.push("Required field author is empty");
    }

    if (Array.isArray(project.users) && project.users.every((userId: unknown) => typeof userId === "string")) {
      const users = await this.userService.getByIds(project.users);
      if (users.length === 0) {
        errors.push("Project must have at least one member");
      }
    } else {
      errors.push("Project must have at least one member");
    }

    if (
      !Array.isArray(project.epics) ||
      !project.epics.every(
        (epic: unknown) =>
          !!epic &&
          typeof epic === "object" &&
          "id" in epic &&
          typeof epic.id === "string" &&
          "name" in epic &&
          typeof epic.name === "string",
      )
    ) {
      errors.push("Epics are empty or have incorrect format");
    }

    if (
      !Array.isArray(project.sprints) ||
      !project.sprints.every(
        (sprint: unknown) =>
          !!sprint &&
          typeof sprint === "object" &&
          "id" in sprint &&
          typeof sprint.id === "string" &&
          "name" in sprint &&
          typeof sprint.name === "string",
      )
    ) {
      errors.push("Sprints are empty or have incorrect format");
    }

    if (
      !Array.isArray(project.stages) ||
      !project.stages.every(
        (stage: unknown) =>
          !!stage &&
          typeof stage === "object" &&
          "id" in stage &&
          typeof stage.id === "string" &&
          "name" in stage &&
          typeof stage.name === "string",
      )
    ) {
      errors.push("Stages are empty or have incorrect format");
    }

    if (
      !!project.customFields &&
      (!Array.isArray(project.customFields) ||
        !project.customFields.every(
          (field: unknown) =>
            !!field &&
            typeof field === "object" &&
            "id" in field &&
            typeof field.id === "string" &&
            "name" in field &&
            typeof field.name === "string" &&
            "type" in field &&
            typeof field.type === "string",
        ))
    ) {
      errors.push("CustomFields have incorrect format");
    }

    return errors;
  }
}
