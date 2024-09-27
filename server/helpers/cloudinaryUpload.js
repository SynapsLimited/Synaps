// helpers/cloudinaryUpload.js

const cloudinary = require('../config/cloudinaryConfig'); // Ensure correct path

/**
 * Uploads an image buffer to Cloudinary.
 * @param {Buffer} buffer - The image buffer.
 * @param {String} folder - The folder name in Cloudinary.
 * @param {String} filename - The desired filename.
 * @returns {Promise<Object>} - The Cloudinary upload result.
 */
const uploadToCloudinary = (buffer, folder, filename) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: filename,
        resource_type: 'image',
        overwrite: true, // Overwrite existing image with the same public_id
      },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
    stream.end(buffer);
  });
};

module.exports = uploadToCloudinary;
