
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuid } = require("uuid");
const uploadToCloudinary = require('../helpers/cloudinaryUpload'); // Ensure correct path
const cloudinary = require('cloudinary').v2; // Not necessary if already configured in cloudinaryConfig.js

const User = require('../models/userModel');
const HttpError = require("../models/errorModel");


// Define allowed emails
const allowedEmails = [
    "bshehaj92@gmail.com",
    "synapslimited@gmail.com",
    "muhamedbrojka@yahoo.com",
    "enriko.shkurti11@gmail.com",
    "yann2045@gmail.com"
];


// ======================= Register a New User
// POST : /api/users/register
// UNPROTECTED

const registerUser = async (req, res, next) => {
    try {
        const { name, email, password, password2 } = req.body;
        if (!name || !email || !password || !password2) {
            return next(new HttpError("Fill in all fields.", 422));
        }

        const newEmail = email.toLowerCase();

        // Check if the email is in the allowed list
        if (!allowedEmails.includes(newEmail)) {
            return next(new HttpError("Not authorized to register. Contact Synaps!", 422));
        }

        const emailExists = await User.findOne({ email: newEmail });
        if (emailExists) {
            return next(new HttpError("Email already exists.", 422));
        }

        if ((password.trim()).length < 6) {
            return next(new HttpError("Password should be at least 6 characters.", 422));
        }

        if (password !== password2) {
            return next(new HttpError("Passwords do not match.", 422));
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);
        const newUser = await User.create({ name, email: newEmail, password: hashedPass });
        res.status(201).json(`New User ${newUser.email} registered.`);
    } catch (error) {
        console.error("Registration Error:", error);
        return next(new HttpError("User Registration failed.", 422));
    }
};


// ======================= Login a Registered User
// POST : /api/users/login
// UNPROTECTED

const loginUser = async (req, res, next) => {
    try {
        console.log("Raw request body received:", req.body); // Debugging log

        // Trim the values to remove any leading/trailing whitespaces or newlines
        const email = req.body.email ? req.body.email.trim() : '';
        const password = req.body.password ? req.body.password.trim() : '';

        if (!email || !password) {
            return next(new HttpError("Fill in all fields.", 422));
        }

        const newEmail = email.toLowerCase();

        const user = await User.findOne({ email: newEmail });
        if (!user) {
            return next(new HttpError("Invalid credentials", 422));
        }

        const comparePass = await bcrypt.compare(password, user.password);
        if (!comparePass) {
            return next(new HttpError("Invalid credentials", 422));
        }

        const { _id: id, name } = user;
        const token = jwt.sign({ id, name }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.status(200).json({ token, id, name });
    } catch (error) {
        return next(new HttpError("Login failed. Please check your credentials.", 422));
    }
};



// ======================= Get User Profile
// GET : /api/users/:id
// UNPROTECTED

const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select('-password');
        if (!user) {
            return next(new HttpError("User not found.", 404));
        }
        res.status(200).json(user);
    } catch (error) {
        return next(new HttpError(error.message || "Failed to fetch user.", 500));
    }
}


// ======================= Change User Avatar
// POST : /api/users/change-avatar
// PROTECTED

const changeAvatar = async (req, res, next) => {
    try {
      // Ensure user is authenticated (assuming authMiddleware sets req.user)
      if (!req.user || !req.user.id) {
        return next(new HttpError("Unauthorized.", 401));
      }
  
      // Check if a file was uploaded
      if (!req.file) {
        return next(new HttpError("Please choose an image.", 422));
      }
  
      // Generate a unique and sanitized filename for the avatar
      const originalName = req.file.originalname.split('.')[0].replace(/\s+/g, '_'); // Replace spaces with underscores
      const avatarExtension = req.file.mimetype.split('/')[1]; // Extract the file extension (e.g., png, jpeg)
      const finalAvatarFilename = `${originalName}-${uuid()}`; // Append UUID to ensure uniqueness
  
      // Upload avatar to Cloudinary using the buffer
      const result = await uploadToCloudinary(req.file.buffer, 'avatars', finalAvatarFilename);
  
      if (!result.secure_url || !result.public_id) {
        return next(new HttpError("Failed to upload avatar to Cloudinary.", 500));
      }
  
      // Optionally, delete the old avatar from Cloudinary (if one exists)
      const user = await User.findById(req.user.id);
      if (user && user.avatarPublicId) {
        await cloudinary.uploader.destroy(user.avatarPublicId);
      }
  
      // Update user in the database:
      // - Save the Cloudinary URL in user.avatar
      // - Save the Cloudinary public_id in user.avatarPublicId
      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        {
          avatar: result.secure_url, // Save the Cloudinary URL
          avatarPublicId: result.public_id, // Save the Cloudinary public_id
        },
        { new: true }
      ).select("-password"); // Exclude password from the returned user
  
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Change Avatar Error:", error);
      // Differentiate between Multer errors (e.g., file size limit) and other server errors
      if (error instanceof multer.MulterError) {
        return next(new HttpError(error.message, 422));
      }
      return next(new HttpError("Failed to upload avatar. Please try again.", 500));
    }
  };
  
  



// ======================= Edit User Details
// PATCH : /api/users/edit-user
// PROTECTED

const editUser = async (req, res, next) => {
    try {
        const { name, email, currentPassword, newPassword, confirmNewPassword } = req.body;
        if (!name || !email || !currentPassword || !newPassword) {
            return next(new HttpError("Fill in all fields", 422));
        }

        // Get user from database
        const user = await User.findById(req.user.id);
        if (!user) {
            return next(new HttpError("User not found", 403));
        }

        // Ensure new email doesn't already exist
        const emailExist = await User.findOne({ email: email.toLowerCase() });

        if (emailExist && (emailExist._id.toString() !== req.user.id)) {
            return next(new HttpError("Email already exists.", 422));
        }

        // Compare current password to db password
        const validateUserPassword = await bcrypt.compare(currentPassword, user.password);
        if (!validateUserPassword) {
            return next(new HttpError("Invalid current password.", 422));
        }

        // Compare new passwords
        if (newPassword !== confirmNewPassword) {
            return next(new HttpError("New passwords do not match.", 422));
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newPassword, salt);

        // Update email to lowercase
        const newEmail = email.toLowerCase();

        // Update user info in database
        const newInfo = await User.findByIdAndUpdate(
            req.user.id,
            { name, email: newEmail, password: hash },
            { new: true }
        ).select('-password');

        res.status(200).json(newInfo);
    } catch (error) {
        console.error("Edit User Error:", error);
        return next(new HttpError(error.message || "Failed to edit user.", 500));
    }
}



// ======================= Get Authors
// GET : /api/users/authors
// UNPROTECTED

const getAuthors = async (req, res, next) => {
    try {
        const authors = await User.find().select('-password');
        res.status(200).json(authors);
    } catch (error) {
        return next(new HttpError(error.message || "Failed to fetch authors.", 500));
    }
}

module.exports = { registerUser, loginUser, getUser, changeAvatar, editUser, getAuthors };
