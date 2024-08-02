import { Project } from "../model/Project";

export interface IProjectRepository {
  getAll(): Promise<Project[]>
  getById(id: string): Promise<Project | null>
  getAllByUser(userId: string): Promise<Project[]>
  create(project: Project): Promise<Project>
  update(project: Project): Promise<Project | null>
  deleteById(id: string): Promise<boolean>
}