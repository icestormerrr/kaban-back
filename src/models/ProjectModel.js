import { Schema, model } from "mongoose";

/**
 * Mongoose schema for Project
 * @name projectSchema
 * @memberof module:Project
 */
export const projectSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  epics: { type: Array, default: [] },
  sprints: { type: Array, default: [] },
  stages: { type: Array, default: [] },
  users: { type: Array, default: [] },
});

/**
 * Mongoose model for the Project schema
 * @name ProjectModel
 * @memberof module:Project
 */
export const ProjectModel = model("Project", projectSchema);
