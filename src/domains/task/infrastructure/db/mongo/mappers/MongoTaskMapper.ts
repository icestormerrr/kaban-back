import { MongoTask } from "../model/MongoTask";
import { Task } from "../../../../core/model/Task";

// this types are similar, but this layer-class is required
export class MongoTaskMapper {
  static toDb(task: Task) {
    return task as MongoTask;
  }

  static toModel(task: MongoTask) {
    return task as Task;
  }
}
