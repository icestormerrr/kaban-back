import ApiError from "../exceptions/ApiError.js";
import { TaskModel } from "../models/TaskModel.js";
import { TaskDto, TasksGriItemDto } from "../dtos/TaskDto.js";
import { userService } from "./UserService.js";
import { projectService } from "./ProjectService.js";
import { findEntityById } from "../utils/searchUtils.js";

/**
 * @module Task
 */

/**
 * Service for managing tasks
 */
class TaskService {
  /**
   * Get tasks data for grid based on the provided filter
   * @param {Object} filter - Filter object containing executorId, sprintId, epicId, and projectId
   * @returns {Promise<Array>} - Array of tasks data for grid
   * @throws {ApiError} - BadRequestError if projectId is not provided
   */
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

  /**
   * Get a single task based on the provided query
   * @param {Object} query - Query object containing _id
   * @returns {Promise<Object>} - Single task object
   * @throws {ApiError} - BadRequestError if _id is not provided
   */
  async getTask(query) {
    const { _id } = query;
    if (!_id) throw ApiError.BadRequestError("Required parameters were not passed");

    const task = await TaskModel.findById(_id);
    return new TaskDto(task);
  }

  /**
   * Create a new task
   * @param {Object} body - Task data to create
   * @returns {Promise<Object>} - Created task
   */
  async createTask(body) {
    const task = await TaskModel.create(new TaskDto(body));
    return task;
  }

  /**
   * Update an existing task
   * @param {Object} body - Updated task data
   * @returns {Promise<Object>} - Updated task
   * @throws {ApiError} - NotFoundError if the task is not found
   */
  async updateTask(body) {
    const updatedTask = await TaskModel.findByIdAndUpdate(body._id, new TaskDto(body), { new: true });
    if (!updatedTask) {
      throw ApiError.NotFoundError("Task not found");
    }
    return updatedTask;
  }

  /**
   * Delete a task
   * @param {string} _id - Task ID to delete
   * @returns {Promise<Object>} - Deletion result
   * @throws {ApiError} - NotFoundError if the task is not found
   */
  async deleteTask(_id) {
    const task = await TaskModel.findById(_id);
    if (!task) {
      throw ApiError.NotFoundError("Task is not found");
    }
    return await task.deleteOne({ _id });
  }
}

export const taskService = new TaskService();
