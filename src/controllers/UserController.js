import { UserModel } from "../models/UserModel.js";

class UserController {
  async getUsers(req, res) {
    try {
      const _id = req.query._id;

      if (_id) {
        const user = await UserModel.findById(_id);
        res.json({ _id: user._id, name: user.name });
      } else {
        const users = await UserModel.find();
        res.json(users.map((user) => ({ _id: user._id, name: user.name })));
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // not tested
  async deleteUser(req, res) {
    try {
      const user = await UserModel.findById(req.params._id);
      if (user) {
        await user.deleteOne({ _id: req.params.id });
        res.status(204).json({ message: "User successfully deleted" });
      } else {
        res.status(404).json({ message: "User is not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

export const userController = new UserController();
