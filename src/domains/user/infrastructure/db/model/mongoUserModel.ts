import { Schema, model, Document, Model } from "mongoose";
import { MongoUser } from "./MongoUser";

interface IMongoUserDocument extends Document, Omit<MongoUser, "_id"> {}
interface IMongoUserModel extends Model<MongoUser> {}

const mongoUserSchema = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
});

export const mongoUserModel = model<IMongoUserDocument, IMongoUserModel>("User", mongoUserSchema);
