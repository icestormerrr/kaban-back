import { Types } from "mongoose";

import { UserModel } from "../models/UserModel.js";
import { TokenModel } from "../models/TokenModel.js";
import UserDto from "../dtos/UserDto.js";
import ApiError from "../exceptions/ApiError.js";

/**
 * @module User
 */

/**
 * Service for managing users
 * @class
 */
class UserService {
  /**
   * Get users based on the provided filter
   * @param {Object} filter - Filter object containing _id or usersIds
   * @returns {Promise<Array>} - Array of users or a single user
   * @throws {ApiError} - BadRequestError if both _id and usersIds are provided
   */
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

  /**
   * Delete a user
   * @param {string} _id - User ID to delete
   * @returns {Promise<Object>} - Deletion result
   * @throws {ApiError} - NotFoundError if the user is not found
   */
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
