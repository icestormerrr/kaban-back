import { Types } from "mongoose";
import { IUserRepository } from "../../../core/repository/IUserRepository";
import { mongoUserModel } from "../model/mongoUserModel";
import { User } from "../../../core/model/User";
import { MongoUserMapper } from "../mappers/MongoUserMapper";

export class MongoUserRepository implements IUserRepository {
  async findById(id: string) {
    const user = await mongoUserModel.findById(id).exec();
    return user ? MongoUserMapper.toModel(user) : null;
  }

  async findByEmail(email: string) {
    const user = await mongoUserModel.findOne({ email }).exec();
    return user ? MongoUserMapper.toModel(user) : null;
  }

  async create(user: User) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, ...userWithoutId } = MongoUserMapper.toDb(user);
    const createdUser = await mongoUserModel.create(userWithoutId);
    return MongoUserMapper.toModel(createdUser);
  }

  async update(user: User) {
    const mongoUser = await mongoUserModel.findByIdAndUpdate(user.id, MongoUserMapper.toDb(user), { new: true }).exec();
    return mongoUser ? MongoUserMapper.toModel(mongoUser) : null;
  }

  async deleteById(id: string) {
    const result = await mongoUserModel.deleteOne({ _id: id }).exec();
    return result.deletedCount === 1;
  }

  async findAll() {
    const mongoUsers = await mongoUserModel.find().exec();
    return mongoUsers.map(MongoUserMapper.toModel);
  }

  async findByIds(ids: string[]) {
    const objectIds = ids.map((id) => new Types.ObjectId(id));
    const mongoUsers = await mongoUserModel.find({ _id: { $in: objectIds } }).exec();
    return mongoUsers.map(MongoUserMapper.toModel);
  }
}
