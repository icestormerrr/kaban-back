import { projectService } from "../services/ProjectService.js";
class ProjectController {
  async getProjects(req, res, next) {
    try {
      const projects = await projectService.getProjects(req.query);
      return res.json(projects);
    } catch (err) {
      next(err);
    }
  }

  // TODO: add validation
  async createProject(req, res, next) {
    try {
      const project = await projectService.createProject(req.body);
      return res.json(project);
    } catch (err) {
      next(err);
    }
  }

  // TODO: add validation
  async updateProject(req, res, next) {
    try {
      const project = await projectService.updateProject(req.body);
      return res.json(project);
    } catch (err) {
      next(err);
    }
  }

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
