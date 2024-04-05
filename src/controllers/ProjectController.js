import { ProjectModel } from "../models/ProjectModel.js";

const projectConstructor = (object) => {
  return {
    name: object.name,
    epics: object.epics,
    sprints: object.sprints,
    stages: object.stages,
    users: object.users,
    author: object.author,
  };
};

class ProjectController {
  async getProjects(req, res, next) {
    try {
      const _id = req.query._id;
      if (_id) {
        const project = await ProjectModel.findById(_id);
        res.json(project);
      } else {
        const projects = await ProjectModel.find();
        res.json(projects.map(({ _id, name }) => ({ _id, name })));
      }
    } catch (err) {
      next(err);
    }
  }

  // not tested
  async createProject(req, res) {
    const project = new ProjectModel(projectConstructor(req.body));
    try {
      await project.save();
      res.status(201);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  // not tested
  async deleteProject(req, res) {
    try {
      const project = await ProjectModel.findById(req.params._id);
      if (project) {
        await project.deleteOne({ _id: req.params.id });
        res.status(204).json({ message: "Project successfully deleted" });
      } else {
        res.status(404).json({ message: "Project is not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

export const projectController = new ProjectController();
