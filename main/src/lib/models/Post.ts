// lib/models/Post.ts
import mongoose, { Schema, model, models } from 'mongoose';

const postSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: {
    type: String,
    enum: ["Marketing", "Business", "Technology", "AI", "Gaming", "Product", "Entertainment"],
    required: true
  },
  description: { type: String, required: true },
  creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
  thumbnail: { type: String, required: true },
}, { timestamps: true });

export default models.Post || model("Post", postSchema);
