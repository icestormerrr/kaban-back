import { Schema, model, Model } from "mongoose";

interface ProjectUser {
  userId: string;
  projectId: string;
}

interface ProjectUserDocument extends Document, ProjectUser {}
interface ProjectUserModel extends Model<ProjectUser> {}

const mongoProjectUserSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
});

export const mongoTokenModel = model<ProjectUserDocument, ProjectUserModel>("ProjectUser", mongoProjectUserSchema);
