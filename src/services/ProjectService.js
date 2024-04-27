import { ProjectModel } from "../models/ProjectModel.js";
import { ProjectDto, ProjectIdNameDto } from "../dtos/ProjectDto.js";
import ApiError from "../exceptions/ApiError.js";
/**
 * @module Project
 */
/**
 * Class for managing projects
 */
class ProjectService {
  /**
   * Get projects based on the provided filter
   * @param {Object} filter - Filter object containing either _id or userId
   * @returns {Promise<Array>} - Array of projects or a single project
   * @throws {ApiError} - BadRequestError if both _id and userId are provided
   */
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

  /**
   * Create a new project
   * @param {Object} body - Project data to create
   * @returns {Promise<Object>} - Created project
   */
  async createProject(body) {
    const project = await ProjectModel.create(new ProjectDto(body));
    return project;
  }

  /**
   * Update an existing project
   * @param {Object} body - Updated project data
   * @returns {Promise<Object>} - Updated project
   * @throws {ApiError} - NotFoundError if the project is not found
   */
  async updateProject(body) {
    const updatedProject = await ProjectModel.findByIdAndUpdate(body._id, new ProjectDto(body), { new: true });
    if (!updatedProject) {
      throw ApiError.NotFoundError("Project not found");
    }
    return updatedProject;
  }

  /**
   * Delete a project
   * @param {string} _id - Project ID to delete
   * @returns {Promise<Object>} - Deletion result
   * @throws {ApiError} - NotFoundError if the project is not found
   */
  async deleteProject(_id) {
    const project = await ProjectModel.findById(_id);
    if (!project) {
      throw ApiError.NotFoundError("Project is not found");
    }
    return await project.deleteOne({ _id });
  }
}
export const projectService = new ProjectService();
