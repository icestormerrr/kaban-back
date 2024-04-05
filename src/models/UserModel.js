import { Schema, model } from "mongoose";

export const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
});

export const UserModel = model("User", userSchema);
