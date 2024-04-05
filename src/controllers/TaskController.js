import { TaskModel } from "../models/TaskModel.js";

const taskConstructor = (object) => {
  return {
    name: object.name,
    epicId: object.epicId,
    sprintId: object.sprintId,
    stageId: object.stageId,
    executorId: object.executorId,
    status: Number(object.status),
    description: object.description,
    authorId: object.authorId,
    comments: object.comments,
  };
};

class TaskController {
  async getTasks(req, res) {
    try {
      const projectId = req.query.projectId;
      const _id = req.query._id;
      if (projectId) {
        const tasks = await TaskModel.find({ projectId: projectId });
        res.json(tasks);
      } else if (_id) {
        const task = await TaskModel.findById(_id);
        res.json(task);
      } else {
        const tasks = await TaskModel.find();
        res.json(tasks);
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // not tested
  async createTask(req, res) {
    try {
      const tasks = new TaskModel(taskConstructor(req.body));
      await tasks.save();
      res.status(201);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async updateTask(req, res) {
    try {
      const updatedTask = await TaskModel.findByIdAndUpdate(req.body._id, taskConstructor(req.body), { new: true });
      if (updatedTask) {
        res.status(200).json(updatedTask);
      } else {
        res.status(404).json({ message: "Task not found" });
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  // not tested
  async deleteTask(req, res) {
    try {
      const task = await TaskModel.findById(req.params._id);
      if (task) {
        await task.deleteOne({ _id: req.params.id });
        res.status(204).json({ message: "Task successfully deleted" });
      } else {
        res.status(404).json({ message: "Task is not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

export const taskController = new TaskController();
