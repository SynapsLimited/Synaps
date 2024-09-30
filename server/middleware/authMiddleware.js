const jwt = require('jsonwebtoken');
const HttpError = require('../models/errorModel');

const authMiddleware = async (req, res, next) => {
    // Get the authorization header (case insensitive)
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
        const token = authHeader.split(' ')[1];
        
        // Verify the token
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log("Token verification failed:", err);  // Log the token error
                return next(new HttpError("Unauthorized. Invalid token.", 403));
            }
            console.log("Decoded Token:", decoded); // Log the decoded token
            
            // Attach the user info to the request object
            req.user = decoded;
            next();
        });
    } else {
        console.log("No Authorization token provided");
        return next(new HttpError("Unauthorized. No token provided.", 401));
    }
};

module.exports = authMiddleware;
