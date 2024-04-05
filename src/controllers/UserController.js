import { userService } from "../services/UserService.js";

class UserController {
  async getUsers(req, res, next) {
    try {
      const users = await userService.getUsers(req.query);
      return res.json(users);
    } catch (err) {
      next(err);
    }
  }

  // not tested
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
