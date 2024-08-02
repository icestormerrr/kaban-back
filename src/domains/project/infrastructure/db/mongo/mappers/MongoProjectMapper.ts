import { Project } from "../../../../core/model/Project";
import { MongoProject } from "../model/MongoProject";

export class MongoProjectMapper {
  static toDb(project: Project) {
    return new MongoProject(
      project._id,
      project.name,
      project.description,
      project.authorId,
      project.epics,
      project.sprints,
      project.stages,
      project.users,
      project.customFields,
    );
  }

  static toModel(project: MongoProject) {
    return new Project(
      project._id,
      project.name,
      project.description,
      project.authorId,
      project.epics,
      project.sprints,
      project.stages,
      project.users,
      project.customFields,
    );
  }
}
