const Course = require('../model/Course');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Bootcamp = require('../model/Bootcamp');


// @desc Get Courses
// @route Get /api/v1/course
// @route Get /api/v1/bootcamp/:bootcampId/course
// access Public
exports.getCourses = asyncHandler(async (req, res, next) => {
    let query;

    if (req.params.bootcampId) {
        query = Course.find({ bootcamp: req.params.bootcampId });
    } else {
        //populate used to get Bootcamp data in Course JSON 
        query = Course.find().populate({
            path: 'bootcamp',
            select: 'name description housing'
        });
    }
    const courses = await query;

    res.status(200).json({ success: true, count: courses.length, data: courses });
});

// @desc Get Course
// @route Get /api/v1/course/:id
// access Public
exports.getCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.findById(req.params.id).populate({
        path: 'bootcamp',
        select: 'name description housing'
    });
    if (!course) {
        return next(new ErrorResponse(`Course not found with id of ${req.params.id}`, 400));
    }
    res.status(200).json({ success: true, data: course });
});

// @desc Add Course
// @route POST /api/v1/bootcamps/:bootcampId/course
// access Public
exports.addCourse = asyncHandler(async (req, res, next) => {
    //Adding bootcampid into the Course object
    req.body.bootcamp = req.params.bootcampId;

    const bootcamp = await Bootcamp.findById(req.params.bootcampId);
    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.bootcampId}`, 400));
    }
    const course = await Course.create(req.body);
    res.status(201).json({ success: true, data: course });
});