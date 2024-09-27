// models/userModel.js

const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String }, // Stores Cloudinary URL
  avatarPublicId: { type: String }, // Stores Cloudinary public_id
  posts: { type: Number, default: 0 },
});

module.exports = model("User", userSchema);
