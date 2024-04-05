export class ProjectDto {
  name;
  epics;
  sprints;
  stages;
  users;
  author;
  constructor(model) {
    this.name = model.name;
    this.epics = model.epics;
    this.sprints = model.sprints;
    this.stages = model.stages;
    this.users = model.users;
    this.author = model.author;
  }
}
