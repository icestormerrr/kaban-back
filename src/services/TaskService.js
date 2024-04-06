import ApiError from "../exceptions/ApiError.js";
import { TaskModel } from "../models/TaskModel.js";
import { TaskDto, TaskShortDto } from "../dtos/TaskDto.js";

class TaskService {
  async getTasks(filter) {
    const { taskId, _id } = filter;
    if (_id && taskId) throw ApiError.BadRequestError("Incompatible parameters");

    if (_id) {
      return await TaskModel.findById(_id);
    }

    if (taskId) {
      const tasks = await TaskModel.find({ taskId: taskId });
      return tasks.map((task) => new TaskShortDto(task));
    }

    const tasks = await TaskModel.find();
    return tasks.map((task) => new TaskShortDto(task));
  }

  async createTask(body) {
    const task = await TaskModel.create(new TaskDto(body));
    return task;
  }

  async updateTask(body) {
    const updatedTask = await TaskModel.findByIdAndUpdate(body._id, new TaskDto(body), { new: true });
    if (!updatedTask) {
      throw ApiError.NotFoundError("Task not found");
    }
    return updatedTask;
  }

  async deleteTask(_id) {
    const task = await TaskModel.findById(_id);
    if (!task) {
      throw ApiError.NotFoundError("Task is not found");
    }
    return await task.deleteOne({ _id });
  }
}

export const taskService = new TaskService();
