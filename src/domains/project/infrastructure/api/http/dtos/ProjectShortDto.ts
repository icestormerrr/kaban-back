import { Project } from "../../../../core/model/Project";

export class ProjectShortDto {
  id: string;
  name: string;
  constructor(object: Project) {
    this.id = object.id;
    this.name = object.name;
  }
}
