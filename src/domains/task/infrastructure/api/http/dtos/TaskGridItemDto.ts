import { Task } from "../../../../core/model/Task";
import { Project } from "../../../../../project/core/model/Project";
import { User } from "../../../../../user/core/model/User";
import { findById } from "../../../../../../common/utils/findById";

export class TaskGridItemDto {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly epicName: string;
  readonly sprintName: string;
  readonly stageId: string;
  readonly stageName: string;
  readonly executorName: string;
  readonly authorName: string;
  readonly status: string;
  readonly creationDatetime: number;
  readonly planEndDatetime?: number;
  constructor(task: Task, project: Project, users: User[]) {
    this.id = task.id;
    this.name = task.name;
    this.description = task.description;
    this.epicName = findById(project.epics, task.epicId)?.name ?? "";
    this.sprintName = findById(project.sprints, task.sprintId)?.name ?? "";
    this.stageId = task.stageId;
    this.stageName = findById(project.stages, task.stageId)?.name ?? "";
    this.executorName = findById(users, task.executorId)?.name ?? "";
    this.authorName = findById(users, task.authorId)?.name ?? "";
    this.status = task.status;
    this.creationDatetime = task.creationDatetime;
    this.planEndDatetime = task.planEndDatetime;
  }
}
