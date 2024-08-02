import { Task } from "../model/Task";

export interface ITaskRepository {
  getAllByFilter(filter: { projectId: string; [key: string]: any }): Promise<Task[]>;
  getById(id: string): Promise<Task | null>;
  create(task: Task): Promise<Task>;
  update(task: Task): Promise<Task | null>;
  deleteById(id: string): Promise<boolean>;
}
