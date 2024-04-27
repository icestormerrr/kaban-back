import { userService } from "../services/UserService.js";

/**
 * Controller for managing users
 * @class
 * @memberof module:User
 */
class UserController {
  /**
   * Get users based on the provided query
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @param {Function} next - Next function
   */
  async getUsers(req, res, next) {
    try {
      const users = await userService.getUsers(req.query);
      return res.json(users);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Delete a user based on the provided query
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @param {Function} next - Next function
   */
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
