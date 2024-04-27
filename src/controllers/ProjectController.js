import { projectService } from "../services/ProjectService.js";

/**
 * Controller for managing projects
 * @class
 * @memberof module:Project
 */
class ProjectController {
  /**
   * Get projects based on the provided query
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @param {Function} next - Next function
   */
  async getProjects(req, res, next) {
    try {
      const projects = await projectService.getProjects(req.query);
      return res.json(projects);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Create a new project
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @param {Function} next - Next function
   */
  async createProject(req, res, next) {
    try {
      const project = await projectService.createProject(req.body);
      return res.json(project);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Update an existing project
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @param {Function} next - Next function
   */
  async updateProject(req, res, next) {
    try {
      const project = await projectService.updateProject(req.body);
      return res.json(project);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Delete a project based on the provided query
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @param {Function} next - Next function
   */
  async deleteProject(req, res, next) {
    try {
      const deleteInfo = await projectService.deleteProject(req.query._id);
      return res.json(deleteInfo);
    } catch (err) {
      next(err);
    }
  }
}

export const projectController = new ProjectController();
