// config/cloudinaryConfig.js

const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with your credentials from environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // e.g., 'my-cloud'
  api_key: process.env.CLOUDINARY_API_KEY,       // e.g., '123456789012345'
  api_secret: process.env.CLOUDINARY_API_SECRET, // e.g., 'abcdefg1234567'
});

module.exports = cloudinary;
