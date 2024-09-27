// models/postModel.js

const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      enum: ["Marketing", "Business", "Technology", "AI", "Gaming", "Product", "Entertainment"],
      message: "{VALUE} is not supported",
      required: true,
    },
    description: { type: String, required: true },
    creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
    thumbnail: { type: String, required: true },
    thumbnailPublicId: { type: String, required: true }, // Added for Cloudinary management
  },
  { timestamps: true }
);

module.exports = model("Post", postSchema);
