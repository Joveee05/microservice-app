import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "../types/userTypes";

const userSchema: Schema = new Schema<IUser>(
  {
    name: { type: String, required: [true, "A user must have a name"] },
    email: {
      type: String,
      required: [true, "A user must have an email"],
      unique: true,
    },
    password: { type: String, required: [true, "A user must have a password"] },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model<IUser>("User", userSchema);
