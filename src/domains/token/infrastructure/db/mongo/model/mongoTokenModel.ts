import { Schema, model, Model } from "mongoose";

import { MongoUserToken } from "./MongoUserToken";

interface UserTokenDocument extends Document, MongoUserToken {}
interface UserTokenModel extends Model<MongoUserToken> {}

const tokenSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  refreshToken: { type: String, required: true },
});

export const mongoTokenModel = model<UserTokenDocument, UserTokenModel>("Token", tokenSchema);
