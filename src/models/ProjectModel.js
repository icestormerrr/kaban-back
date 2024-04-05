import { Schema, model } from "mongoose";

export const projectSchema = new Schema({
  name: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  epics: { type: Array, default: null },
  sprints: { type: Array, default: null },
  stages: { type: Array, default: null },
  users: { type: Array, default: null },
});

export const ProjectModel = model("Project", projectSchema);
