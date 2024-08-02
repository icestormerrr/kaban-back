import { UserToken } from "../../../../core/model/UserToken";
import { MongoUserToken } from "../model/MongoUserToken";

export class MongoUserTokenMapper {
  static toDb(userToken: UserToken) {
    return new MongoUserToken(userToken.userId, userToken.refreshToken);
  }

  static toModel(userToken: MongoUserToken) {
    return new UserToken(userToken.userId, userToken.refreshToken);
  }
}
