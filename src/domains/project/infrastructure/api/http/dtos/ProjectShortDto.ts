export class ProjectShortDto {
  _id: string;
  name: string;
  constructor(object: any) {
    this._id = object._id;
    this.name = object.name;
  }
}
