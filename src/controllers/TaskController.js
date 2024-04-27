import { taskService } from "../services/TaskService.js";

/**
 * Controller for managing tasks
 * @class
 * @memberof module:Task
 */
class TaskController {
  /**
   * Get a single task
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @param {Function} next - Next function
   */
  async getTask(req, res, next) {
    try {
      const tasks = await taskService.getTask(req.query);
      return res.json(tasks);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Get tasks data for grid
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @param {Function} next - Next function
   */
  async getTasksGrid(req, res, next) {
    try {
      const tasksRowData = await taskService.getTasksGrid(req.query);
      return res.json(tasksRowData);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Create a new task
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @param {Function} next - Next function
   */
  async createTask(req, res, next) {
    try {
      const task = await taskService.createTask(req.body);
      return res.json(task);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Update an existing task
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @param {Function} next - Next function
   */
  async updateTask(req, res, next) {
    try {
      const task = await taskService.updateTask(req.body);
      return res.json(task);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Delete a task
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @param {Function} next - Next function
   */
  async deleteTask(req, res, next) {
    try {
      const deleteInfo = await taskService.deleteTask(req.query._id);
      return res.json(deleteInfo);
    } catch (err) {
      next(err);
    }
  }
}
export const taskController = new TaskController();
