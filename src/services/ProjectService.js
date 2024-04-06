import { ProjectModel } from "../models/ProjectModel.js";
import { ProjectDto, ProjectIdNameDto } from "../dtos/ProjectDto.js";
import ApiError from "../exceptions/ApiError.js";

class ProjectService {
  async getProjects(filter) {
    const { _id, userId } = filter;
    if (_id && userId) throw ApiError.BadRequestError("Incompatible parameters");

    if (_id) {
      const project = await ProjectModel.findById(_id);
      return project;
    }
    if (userId) {
      const projects = await ProjectModel.find({ users: userId });
      return projects.map((project) => new ProjectIdNameDto(project));
    }
    const projects = await ProjectModel.find();
    return projects.map((project) => new ProjectIdNameDto(project));
  }

  async createProject(body) {
    const project = await ProjectModel.create(new ProjectDto(body));
    return project;
  }

  async updateProject(body) {
    const updatedProject = await ProjectModel.findByIdAndUpdate(body._id, new ProjectDto(body), { new: true });
    if (!updatedProject) {
      throw ApiError.NotFoundError("Project not found");
    }
    return updatedProject;
  }

  async deleteProject(_id) {
    const project = await ProjectModel.findById(_id);
    if (!project) {
      throw ApiError.NotFoundError("Project is not found");
    }
    return await project.deleteOne({ _id });
  }
}
export const projectService = new ProjectService();
