import { ITaskRepository } from "../../../../core/repository/ITaskRepository";
import { MongoTaskMapper } from "../mappers/MongoTaskMapper";
import { mongoTaskModel } from "../model/mongoTaskModel";
import { Task } from "../../../../core/model/Task";
import { TaskFilter } from "../../../../core/model/TaskFilter";

export class MongoTaskRepository implements ITaskRepository {
  async getAllByFilter(filter: TaskFilter) {
    this.formatFilter(filter);

    const tasks = await mongoTaskModel.find(filter).exec();
    return tasks.map((mongoTask) => MongoTaskMapper.toModel(mongoTask.toObject()));
  }

  private formatFilter(filter: TaskFilter) {
    const searchFields = Object.keys(filter).filter((key) => typeof filter[key] === "string");
    for (const field of searchFields) {
      const regexPattern = new RegExp(`.*${filter[field]}.*`, "i");
      filter[field] = { $regex: regexPattern };
    }
  }

  async getById(id: string) {
    const task = await mongoTaskModel.findById(id).exec();

    if (!task) {
      return null;
    }
    return MongoTaskMapper.toModel(task.toObject());
  }
  async create(task: Task) {
    const newTask = await mongoTaskModel.create(MongoTaskMapper.toDb(task));

    return MongoTaskMapper.toModel(newTask.toObject());
  }

  async update(task: Task) {
    const { creationDatetime, ...datelessTask } = task;

    const updatedTask = await mongoTaskModel
      .findByIdAndUpdate(task.id, MongoTaskMapper.toDb(datelessTask as Task), { new: true })
      .exec();

    return updatedTask ? MongoTaskMapper.toModel(updatedTask.toObject()) : null;
  }

  async deleteById(id: string) {
    const result = await mongoTaskModel.deleteOne({ _id: id }).exec();
    return result.deletedCount === 1;
  }
}
