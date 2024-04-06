import { Schema, model } from "mongoose";

export const taskSchema = new Schema({
  id: { type: String },
  name: { type: String, required: true },
  description: { type: String, required: true },
  epicId: { type: String, required: true },
  sprintId: { type: String, required: true },
  stageId: { type: String, required: true },
  executorId: { type: String, required: true, ref: Schema.Types.ObjectId },
  authorId: { type: String, required: true, ref: Schema.Types.ObjectId },
  projectId: { type: String, required: true, ref: Schema.Types.ObjectId },
  status: { type: String, required: true },
  comments: { type: Array, default: null },
});

export const TaskModel = model("Task", taskSchema);
