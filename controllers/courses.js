const Course = require('../model/Course');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');


// @desc Get Course
// @route Get /api/v1/course
// @route Get /api/v1/bootcamp/:bootcampId/course
// access Public
exports.getCourses = asyncHandler(async (req, res, next) => {
    let query;

    if (req.params.bootcampId) {
        query = Course.find({ bootcamp: req.params.bootcampId });
    } else {
        query = Course.find();
    }
    const courses = await query;

    res.status(200).json({ success: true, count: courses.length, data: courses });
});