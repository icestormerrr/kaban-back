import { taskService } from "../services/TaskService.js";

class TaskController {
  async getTask(req, res, next) {
    try {
      const tasks = await taskService.getTask(req.query);
      return res.json(tasks);
    } catch (err) {
      next(err);
    }
  }

  async getTasksGrid(req, res, next) {
    try {
      const tasksRowData = await taskService.getTasksGrid(req.query);
      return res.json(tasksRowData);
    } catch (err) {
      next(err);
    }
  }

  // TODO: add validation
  async createTask(req, res, next) {
    try {
      const task = await taskService.createTask(req.body);
      return res.json(task);
    } catch (err) {
      next(err);
    }
  }

  // TODO: add validation
  async updateTask(req, res, next) {
    try {
      const task = await taskService.updateTask(req.body);
      return res.json(task);
    } catch (err) {
      next(err);
    }
  }

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
