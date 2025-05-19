import mongoose from "mongoose";
import { BOOKTYPE } from "./bookType";

const bookSchema = new mongoose.Schema<BOOKTYPE>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    coverImage: {
      type: String,

      required: true,
    },
    file: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<BOOKTYPE>("Book", bookSchema);
