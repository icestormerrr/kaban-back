import { Task } from "../model/Task";
import { TaskFilter } from "../model/TaskFilter";
import { TaskStatus } from "../model/TaskStatus";

export interface ITaskRepository {
  getAllByProject(filter: TaskFilter): Promise<Task[]>;
  getById(id: string): Promise<Task | null>;
  getAllByStatus(status: TaskStatus): Promise<Task[]>;
  getAllByDateFrom(date: number): Promise<Task[]>;
  create(task: Task): Promise<Task>;
  update(task: Task): Promise<Task | null>;
  deleteById(id: string): Promise<boolean>;
}
