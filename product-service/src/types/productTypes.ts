import { Document } from "mongoose";

export interface IProduct extends Document {
  _id: string;
  name: string;
  description: string;
  price: number;
}

export interface ProductRequest {
  name?: string;
  description?: string;
  price?: number;
}

export interface ProductResponse {
  status: "success" | "failed";
  message: string;
  data: {
    name: string;
    description: string;
    price: number;
  };
  error: string;
}
