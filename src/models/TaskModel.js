import { Schema, model } from "mongoose";

/**
 * Mongoose schema for Task
 * @name taskSchema
 * @memberof module:Task
 */
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
  messages: { type: Array, default: null },
});

/**
 * Mongoose model for the Task schema
 * @name TaskModel
 * @memberof module:Task
 */
export const TaskModel = model("Task", taskSchema);
