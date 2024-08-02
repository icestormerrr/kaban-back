import { MongoTask } from "../model/MongoTask";
import { Task } from "../../../../core/model/Task";

export class MongoTaskMapper {
  static toDb(task: Task) {
    return task as MongoTask;
  }

  static toModel(task: MongoTask) {
    return task as Task;
  }
}
