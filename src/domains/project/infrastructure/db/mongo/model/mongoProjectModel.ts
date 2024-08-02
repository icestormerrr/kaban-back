import { Schema, model, Model } from "mongoose";
import { MongoProject } from "./MongoProject";
import { ProjectCustomFieldTypes } from "../../../../core/model/ProjectCustomFieldTypes";

interface IMongoProjectDocument extends Document, MongoProject {}
interface IMongoProjectModel extends Model<MongoProject> {}

export const projectSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  authorId: { type: String, required: true },
  epics: [
    {
      _id: { type: String, required: true },
      name: { type: String, required: true },
    },
  ],
  sprints: [
    {
      _id: { type: String, required: true },
      name: { type: String, required: true },
    },
  ],
  stages: [
    {
      _id: { type: String, required: true },
      name: { type: String, required: true },
    },
  ],
  users: [{ type: String, required: true }],
  customFields: [
    {
      _id: { type: String, required: true },
      name: { type: String, required: true },
      type: { type: String, enum: Object.values(ProjectCustomFieldTypes) },
    },
  ],
});

export const mongoProjectModel = model<IMongoProjectDocument, IMongoProjectModel>("Project", projectSchema);
