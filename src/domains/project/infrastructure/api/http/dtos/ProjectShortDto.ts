export class ProjectShortDto {
  id: string;
  name: string;
  constructor(object: any) {
    this.id = object.id;
    this.name = object.name;
  }
}
