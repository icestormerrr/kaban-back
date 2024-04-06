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
  comments;
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
    this.status = Number(model.status);
    this.comments = model.comments;
  }
}

export class TaskShortDto {
  _id;
  name;
  epicId;
  sprintId;
  stageId;
  executorId;
  status;
  constructor(model) {
    this._id = model._id;
    this.name = model.name;
    this.epicId = model.epicId;
    this.sprintId = model.sprintId;
    this.stageId = model.stageId;
    this.executorId = model.executorId;
    this.status = Number(model.status);
  }
}
