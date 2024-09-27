// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const HttpError = require('../models/errorModel');
const User = require('../models/userModel');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(new HttpError("Unauthorized: No token provided.", 401));
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return next(new HttpError("Unauthorized: User not found.", 401));
    }

    req.user = { id: user._id, name: user.name };
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return next(new HttpError("Unauthorized: Invalid token.", 401));
  }
};

module.exports = authMiddleware;
