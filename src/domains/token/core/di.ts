import { TokenService } from "./service/TokenService";
import { MongoTokenRepository } from "../infrastructure/db/mongo/repository/MongoTokenRepository";

export const tokenService = new TokenService(new MongoTokenRepository());
