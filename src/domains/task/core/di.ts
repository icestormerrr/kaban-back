import { TaskService } from "./service/TaskService";
import { MongoTaskRepository } from "../infrastructure/db/mongo/repository/MongoTaskRepository";
import { userService } from "../../user/core/di";
import { projectService } from "../../project/core/di";

export const taskService = new TaskService(new MongoTaskRepository(), userService, projectService);
