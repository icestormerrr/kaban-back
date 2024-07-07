export class ProjectDto {
  name;
  description;
  epics;
  sprints;
  stages;
  users;
  authorId;
  customFields;
  constructor(model) {
    this.name = model.name;
    this.description = model.description;
    this.epics = model.epics;
    this.sprints = model.sprints;
    this.stages = model.stages;
    this.users = model.users;
    this.authorId = model.authorId;
    this.customFields = model.customFields;
  }
}

export class ProjectIdNameDto {
  _id;
  name;
  constructor(model) {
    this._id = model._id;
    this.name = model.name;
  }
}
