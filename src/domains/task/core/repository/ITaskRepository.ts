import { Task } from "../model/Task";
import { TaskFilter } from "../model/TaskFilter";

export interface ITaskRepository {
  getAllByFilter(filter: TaskFilter): Promise<Task[]>;
  getById(id: string): Promise<Task | null>;
  create(task: Task): Promise<Task>;
  update(task: Task): Promise<Task | null>;
  deleteById(id: string): Promise<boolean>;
}
