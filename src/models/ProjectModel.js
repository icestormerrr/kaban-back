import { Schema, model } from "mongoose";

export const projectSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  epics: { type: Array, default: [] },
  sprints: { type: Array, default: [] },
  stages: { type: Array, default: [] },
  users: { type: Array, default: [] },
});

export const ProjectModel = model("Project", projectSchema);
