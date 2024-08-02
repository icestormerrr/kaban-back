import { UserService } from "./service/UserService";
import { MongoUserRepository } from "../infrastructure/db/repository/MongoUserRepository";
import { tokenService } from "../../token/core/di";

export const userService = new UserService(new MongoUserRepository(), tokenService);
