// middleware/multerConfig.js

const multer = require('multer');

// Configure multer to use memory storage
const storage = multer.memoryStorage();

// File filter to accept only specific image formats
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extName = allowedTypes.test(
    file.originalname.toLowerCase().split('.').pop()
  );
  const mimeType = allowedTypes.test(file.mimetype);
  
  if (mimeType && extName) {
    return cb(null, true);
  }
  cb(new Error('Only JPEG, PNG, and WEBP images are allowed.'));
};

// Initialize multer with the defined storage and file filter
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter,
});

module.exports = upload;
