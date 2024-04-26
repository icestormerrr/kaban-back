import ApiError from "../exceptions/ApiError.js";
import { TaskModel } from "../models/TaskModel.js";
import { TaskDto, TaskShortDto, TasksGridDto } from "../dtos/TaskDto.js";
import { userService } from "./UserService.js";
import { projectService } from "./ProjectService.js";

class TaskService {
  async getTasks(filter) {
    const { executorId, sprintId, epicId, projectId, _id } = filter;

    if (!_id && !projectId) throw ApiError.BadRequestError("Required parameters were not passed");

    if (_id && (projectId || executorId || sprintId || epicId))
      throw ApiError.BadRequestError("Incompatible parameters");

    if (_id) {
      return await TaskModel.findById(_id);
    }

    const dbFilter = { projectId };
    if (executorId) dbFilter.executorId = executorId;
    if (sprintId) dbFilter.sprintId = sprintId;
    if (epicId) dbFilter.epicId = epicId;

    const tasks = await TaskModel.find(dbFilter);
    return tasks.map((task) => new TaskShortDto(task));
  }

  async getTasksGrid(filter) {
    const { projectId } = filter;

    if (!projectId) throw ApiError.BadRequestError("Required parameters were not passed");

    const tasks = await TaskModel.find({ projectId });
    const project = await projectService.getProjects({ _id: projectId });
    const users = await userService.getUsers({ usersIds: project.users.join(",") });

    const rowData = tasks.map((task) => {
      return new TasksGridDto({
        _id: task._id,
        id: task._id,
        name: task.name,
        description: task.description,
        epicName: project.epics.find((e) => e._id === task.epicId)?.name ?? "",
        sprintName: project.sprints.find((s) => s._id === task.sprintId)?.name ?? "",
        stageName: project.stages.find((s) => s._id === task.stageId)?.name ?? "",
        executorName: users.find((u) => u._id.toString() === task.executorId)?.name ?? "",
        authorName: users.find((u) => u._id.toString() === task.authorId)?.name ?? "",
        status: Number(task.status),
      });
    });

    return rowData;
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
