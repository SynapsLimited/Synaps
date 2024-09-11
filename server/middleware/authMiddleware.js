const jwt = require('jsonwebtoken');
const HttpError = require('../models/errorModel');

const authMiddleware = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    if (authorizationHeader && authorizationHeader.startsWith("Bearer")) {
        const token = authorizationHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return next(new HttpError("Unauthorized. Invalid token.", 401)); // Use 401 for unauthorized
            }

            req.user = decoded; // Attach user info to the request object
            next();
        });
    } else {
        return next(new HttpError("Unauthorized. No token provided.", 401)); // Use 401 for no token
    }
};

module.exports = authMiddleware;
