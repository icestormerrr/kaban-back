import { userService } from "../services/UserService.js";
import UserDto from "../dtos/UserDto.js";

class UserController {
  // gets req.user from authMiddleware
  async getCurrentUser(req, res, next) {
    try {
      return res.json(new UserDto(req.user));
    } catch (err) {
      next(err);
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await userService.getUsers(req.query);
      return res.json(users);
    } catch (err) {
      next(err);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const deleteInfo = await userService.deleteUser(req.query._id);
      return res.json(deleteInfo);
    } catch (err) {
      next(err);
    }
  }
}

export const userController = new UserController();
