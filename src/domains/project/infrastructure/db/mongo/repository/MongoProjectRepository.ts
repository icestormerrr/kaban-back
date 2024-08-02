import { IProjectRepository } from "../../../../core/repository/IProjectRepository";
import { Project } from "../../../../core/model/Project";
import { mongoProjectModel } from "../model/mongoProjectModel";
import { MongoProjectMapper } from "../mappers/MongoProjectMapper";

export class MongoProjectRepository implements IProjectRepository {
  async getAll() {
    const projects = await mongoProjectModel.find().exec();

    return projects.map(MongoProjectMapper.toModel);
  }

  async getAllByUser(userId: string) {
    const projects = await mongoProjectModel.find({ users: userId }).exec();

    return projects.map(MongoProjectMapper.toModel);
  }

  async getById(id: string) {
    const project = await mongoProjectModel.findById(id).exec();

    return project ? MongoProjectMapper.toModel(project) : null;
  }
  async create(project: Project) {
    const newProject = await mongoProjectModel.create(MongoProjectMapper.toDb(project));

    return MongoProjectMapper.toModel(newProject);
  }

  async update(project: Project) {
    const updatedProject = await mongoProjectModel
      .findByIdAndUpdate(project._id, MongoProjectMapper.toDb(project), { new: true })
      .exec();

    return updatedProject ? MongoProjectMapper.toModel(updatedProject) : null;
  }

  async deleteById(id: string) {
    const result = await mongoProjectModel.deleteOne({ _id: id }).exec();
    return result.deletedCount === 1;
  }
}
