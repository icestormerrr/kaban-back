import ApiError from "../exceptions/ApiError.js";
import { TaskModel } from "../models/TaskModel.js";
import { TaskDto, TasksGriItemDto } from "../dtos/TaskDto.js";
import { userService } from "./UserService.js";
import { projectService } from "./ProjectService.js";
import { findEntityById } from "../utils/searchUtils.js";

class TaskService {
  async getTasksGrid(filter) {
    const { executorId, sprintId, epicId, projectId } = filter;

    if (!projectId) throw ApiError.BadRequestError("Required parameters were not passed");

    const dbTaskFilter = { projectId };
    if (executorId) dbTaskFilter.executorId = executorId;
    if (sprintId) dbTaskFilter.sprintId = sprintId;
    if (epicId) dbTaskFilter.epicId = epicId;

    const tasks = await TaskModel.find(dbTaskFilter);
    const project = await projectService.getProjects({ _id: projectId });
    const projectUsers = await userService.getUsers({ usersIds: project.users.join(",") });

    const rowData = tasks.map((task) => {
      return new TasksGriItemDto({
        _id: task._id,
        id: task._id,
        name: task.name,
        description: task.description,
        epicName: findEntityById(project.epics, task.epicId)?.name ?? "",
        sprintName: findEntityById(project.sprints, task.sprintId)?.name ?? "",
        stageId: task.stageId,
        stageName: findEntityById(project.stages, task.stageId)?.name ?? "",
        executorName: findEntityById(projectUsers, task.executorId)?.name ?? "",
        authorName: findEntityById(projectUsers, task.authorId)?.name ?? "",
        status: task.status,
      });
    });

    return rowData;
  }

  async getTask(query) {
    const { _id } = query;
    if (!_id) throw ApiError.BadRequestError("Required parameters were not passed");

    const task = await TaskModel.findById(_id);
    return new TaskDto(task);
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
