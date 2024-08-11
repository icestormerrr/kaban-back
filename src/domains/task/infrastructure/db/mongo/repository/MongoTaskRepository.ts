import { ITaskRepository } from "../../../../core/repository/ITaskRepository";
import { MongoTaskMapper } from "../mappers/MongoTaskMapper";
import { mongoTaskModel } from "../model/mongoTaskModel";
import { Task } from "../../../../core/model/Task";

export class MongoTaskRepository implements ITaskRepository {
  async getAllByFilter(filter: { projectId: string; [key: string]: any }) {
    const searchFields = Object.keys(filter).filter((key) => typeof filter[key] === "string");

    for (const field of searchFields) {
      const regexPattern = new RegExp(`.*${filter[field]}.*`, "i");
      filter[field] = { $regex: regexPattern };
    }

    const tasks = await mongoTaskModel.find(filter).exec();
    return tasks.map((mongoTask) => MongoTaskMapper.toModel(mongoTask.toObject()));
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
    const updatedTask = await mongoTaskModel
      .findByIdAndUpdate(task._id, MongoTaskMapper.toDb(task), { new: true })
      .exec();
    if (!updatedTask) {
      return null;
    }
    return MongoTaskMapper.toModel(updatedTask.toObject());
  }

  async deleteById(id: string) {
    const result = await mongoTaskModel.deleteOne({ _id: id }).exec();
    return result.deletedCount === 1;
  }
}
