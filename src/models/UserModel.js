import { Schema, model } from "mongoose";

/**
 * Mongoose schema for User
 * @name userSchema
 * @memberof module:User
 */
export const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
});

/**
 * Mongoose model for the User schema
 * @name UserModel
 * @memberof module:User
 */
export const UserModel = model("User", userSchema);
