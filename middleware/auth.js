const jwt = require('jsonwebtoken');
const User = require('../model/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

//Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    // else if (req.cookies.token) {
    //     token = req.cookies.token;
    // }

    //Make sure token exists    
    if (!token) {
        return next(new ErrorResponse('No token provided', 401));
    }

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded._id);
        next();
    } catch (error) {
        return next(new ErrorResponse('Invalid token', 401));
    }
});