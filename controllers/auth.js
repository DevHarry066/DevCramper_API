const User = require('../model/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc Register User
// @route POST /api/v1/auth/register
// access Public
exports.registerUser = asyncHandler(async (req, res, next) => {
    const { name, email, password, role } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        role
    });

    const token = user.getSignedJwtToken();

    res.status(200).json({ success: true, token: token });
});

// @desc Login User
// @route POST /api/v1/auth/login
// access Public
exports.loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    //Validate email and password
    if (!email || !password) {
        return next(new ErrorResponse('Please provide email and password', 400));
    }

    //Check if the user is present
    const user = await User.findOne({ email }).select('+password');

    //If user not present
    if (!user) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }

    //Check password
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }

    const token = user.getSignedJwtToken();

    res.status(200).json({ success: true, token: token });
});