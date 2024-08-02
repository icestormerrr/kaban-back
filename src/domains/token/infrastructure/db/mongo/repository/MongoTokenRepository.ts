import { ITokenRepository } from "../../../../core/repository/ITokenRepository";
import { mongoTokenModel } from "../model/mongoTokenModel";
import { MongoUserTokenMapper } from "../mappers/MongoUserTokenMapper";
import { UserToken } from "../../../../core/model/UserToken";

export class MongoTokenRepository implements ITokenRepository {
  async getByRefreshTokenValue(refreshToken: string) {
    const userToken = await mongoTokenModel.findOne({ refreshToken }).exec();
    return userToken ? MongoUserTokenMapper.toModel(userToken) : null;
  }

  async getByUserId(userId: string) {
    const userToken = await mongoTokenModel.findOne({ userId }).exec();
    return userToken ? MongoUserTokenMapper.toModel(userToken) : null;
  }
  async create(userToken: UserToken) {
    const createdUserToken = await mongoTokenModel.create(MongoUserTokenMapper.toDb(userToken));
    return MongoUserTokenMapper.toModel(createdUserToken);
  }

  async update(userToken: UserToken) {
    const updatedUserToken = await mongoTokenModel
      .findOneAndUpdate({ userId: userToken.userId }, userToken, { new: true })
      .exec();

    return updatedUserToken ? MongoUserTokenMapper.toModel(updatedUserToken) : updatedUserToken;
  }

  async delete(refreshToken: string) {
    const result = await mongoTokenModel.deleteOne({ refreshToken }).exec();
    return result.deletedCount === 1;
  }
}
