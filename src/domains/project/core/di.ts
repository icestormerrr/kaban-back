import { ProjectService } from "./service/ProjectService";
import { MongoProjectRepository } from "../infrastructure/db/mongo/repository/MongoProjectRepository";
import { userService } from "../../user/core/di";

export const projectService = new ProjectService(new MongoProjectRepository(), userService);
