import { ProjectCustomFieldTypes } from "./ProjectCustomFieldTypes";

export class Project {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly description: string,
    readonly authorId: string,
    readonly epics: { id: string; name: string }[],
    readonly sprints: { id: string; name: string }[],
    readonly stages: { id: string; name: string }[],
    readonly users: string[],
    readonly customFields: { id: string; name: string; type: ProjectCustomFieldTypes; required?: boolean }[],
  ) {}
}
