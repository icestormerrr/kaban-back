import { Schema, Model, model } from "mongoose";
import { MongoTask } from "./MongoTask";

interface IMongoTaskDocument extends Document, MongoTask {}
interface IMongoTaskModel extends Model<MongoTask> {}

const messageSchema = new Schema({
  _id: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Number, required: true },
  userId: { type: String, required: true },
});

const mongoTaskSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    epicId: { type: String, required: true },
    sprintId: { type: String, required: true },
    stageId: { type: String, required: true },
    authorId: { type: String, ref: "User", required: true },
    executorId: { type: String, ref: "User", required: true },
    projectId: { type: String, ref: "Project", required: true },
    creationDatetime: { type: Number, required: true },
    planEndDatetime: { type: Number },
    messages: { type: [messageSchema], required: false },
  },
  { strict: false },
);

export const mongoTaskModel = model<IMongoTaskDocument, IMongoTaskModel>("Task", mongoTaskSchema);
