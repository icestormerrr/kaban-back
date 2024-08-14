import { User } from "../../../core/model/User";
import { MongoUser } from "../model/MongoUser";

export class MongoUserMapper {
  static toDb(user: User) {
    return new MongoUser(user.id, user.email, user.name, user.password);
  }

  static toModel(user: MongoUser) {
    return new User(user._id, user.email, user.name, user.password);
  }
}
