import { MongoTask } from "../model/MongoTask";
import { Task } from "../../../../core/model/Task";

export class MongoTaskMapper {
  static toDb(task: Task) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...taskWithoutId } = task;
    return { ...taskWithoutId, _id: task.id } as MongoTask;
  }

  static toModel(task: MongoTask) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...taskWithoutId } = task;
    return { ...taskWithoutId, id: task._id } as Task;
  }
}
