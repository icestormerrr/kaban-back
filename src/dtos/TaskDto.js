export class TaskDto {
  _id;
  name;
  description;
  epicId;
  sprintId;
  stageId;
  executorId;
  authorId;
  projectId;
  status;
  messages;
  custom;
  constructor(model) {
    this._id = model._id;
    this.name = model.name;
    this.description = model.description;
    this.epicId = model.epicId;
    this.sprintId = model.sprintId;
    this.stageId = model.stageId;
    this.executorId = model.executorId;
    this.authorId = model.authorId;
    this.projectId = model.projectId;
    this.status = model.status;
    this.messages = model.messages;
    this.custom = model.custom;
  }
}

export class TasksGriItemDto {
  _id;
  name;
  description;
  epicName;
  sprintName;
  stageId;
  stageName;
  executorName;
  authorName;
  status;
  constructor(model) {
    this._id = model._id;
    this.name = model.name;
    this.description = model.description;
    this.epicName = model.epicName;
    this.sprintName = model.sprintName;
    this.stageId = model.stageId;
    this.stageName = model.stageName;
    this.executorName = model.executorName;
    this.authorName = model.authorName;
    this.status = model.status;
  }
}
