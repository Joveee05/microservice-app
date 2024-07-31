import mongoose, { Schema, Document } from "mongoose";
import { IProduct } from "../types/productTypes";

const productSchema: Schema = new Schema<IProduct>(
  {
    name: { type: String, required: [true, "A product must have a name"] },
    description: {
      type: String,
      required: [true, "A product must have a description"],
    },
    price: { type: Number, required: [true, "A product must have a price"] },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model<IProduct>("Product", productSchema);
