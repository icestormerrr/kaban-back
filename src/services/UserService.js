import { Types } from "mongoose";

import { UserModel } from "../models/UserModel.js";
import { TokenModel } from "../models/TokenModel.js";
import UserDto from "../dtos/UserDto.js";
import ApiError from "../exceptions/ApiError.js";

class UserService {
  async getUsers(filter) {
    const { _id, usersIds } = filter;
    if (_id && usersIds) throw ApiError.BadRequestError("Incompatible parameters");

    if (_id) {
      const user = await UserModel.findById(_id);
      return new UserDto(user);
    }
    if (usersIds) {
      const users = await UserModel.find({
        _id: { $in: usersIds.split(",").map((id) => new Types.ObjectId(id.trim())) },
      });
      return users.map((user) => new UserDto(user));
    }

    const users = await UserModel.find();
    return users.map((user) => new UserDto(user));
  }

  async deleteUser(_id) {
    const user = await UserModel.findById(_id);
    if (!user) {
      throw ApiError.NotFoundError("User is not found");
    }
    await TokenModel.deleteOne({ userId: _id });
    return await user.deleteOne({ _id });
  }
}
export const userService = new UserService();
