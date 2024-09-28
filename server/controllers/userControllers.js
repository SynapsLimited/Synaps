
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuid } = require("uuid");
const User = require('../models/userModel');
const HttpError = require("../models/errorModel");
const { Blob } = require('@vercel/blob'); // Import Vercel Blob



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

const changeAvatar = async (req, res) => {
    const userId = req.user._id;
    const { file } = req; // Assuming you use multer for file upload
    
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
  
    try {
      // Create a Vercel Blob bucket object
      const blob = new Blob({ access: 'public' });
  
      // Upload the file to Vercel Blob
      const fileStream = file.buffer; // Get file buffer if using multer
      const fileName = `${userId}_${Date.now()}_${file.originalname}`;
      const { url } = await blob.upload(fileName, fileStream);
  
      // Update user in MongoDB with the new avatar URL
      const user = await User.findByIdAndUpdate(userId, {
        avatar: url,
      }, { new: true });
  
      res.status(200).json({ avatar: user.avatar });
    } catch (error) {
      console.error('Error uploading avatar:', error);
      res.status(500).json({ message: "Server error while uploading avatar." });
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
