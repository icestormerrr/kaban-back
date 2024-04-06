export class TaskDto {
  name;
  description;
  epicId;
  sprintId;
  stageId;
  executorId;
  authorId;
  status;
  comments;
  constructor(model) {
    this.name = model.name;
    this.description = model.description;
    this.epicId = model.epicId;
    this.sprintId = model.sprintId;
    this.stageId = model.stageId;
    this.executorId = model.executorId;
    this.authorId = model.authorId;
    this.status = Number(model.status);
    this.comments = model.comments;
  }
}

export class TaskShortDto {
  name;
  epicId;
  sprintId;
  stageId;
  executorId;
  status;
  constructor(model) {
    this.name = model.name;
    this.epicId = model.epicId;
    this.sprintId = model.sprintId;
    this.stageId = model.stageId;
    this.executorId = model.executorId;
    this.status = Number(model.status);
  }
}
