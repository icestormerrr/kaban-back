import { ProjectCustomFieldTypes } from "../../../../core/model/ProjectCustomFieldTypes";

export class MongoProject {
  constructor(
    readonly _id: string,
    readonly name: string,
    readonly description: string,
    readonly authorId: string,
    readonly epics: {_id: string, name: string}[],
    readonly sprints: {_id: string, name: string}[],
    readonly stages: {_id: string, name: string}[],
    readonly users: string[],
    readonly customFields: {_id: string, name: string, type: ProjectCustomFieldTypes}[]
  ) {}
}