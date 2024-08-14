import { MongoTask } from "../model/MongoTask";
import { Task } from "../../../../core/model/Task";

// this types are similar, but this layer-class is required
export class MongoTaskMapper {
  static toDb(task: Task) {
    const { id, ...taskWithoutId } = task;
    return { ...taskWithoutId, _id: task.id } as MongoTask;
  }

  static toModel(task: MongoTask) {
    const { id, ...taskWithoutId } = task;
    return { ...taskWithoutId, id: task._id } as Task;
  }
}
