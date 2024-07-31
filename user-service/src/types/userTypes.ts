import { Document } from "mongoose";

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
}

export interface UserRequest {
  name?: string;
  email?: string;
  password?: string;
}

export interface UserResponse {
  status: "success" | "failed";
  message: string;
  data: {
    name: string;
    email: string;
  };
  error: string;
}
