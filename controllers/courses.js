const Course = require('../model/Course');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Bootcamp = require('../model/Bootcamp');
const advancedResults = require('../middleware/advancedResults');


// @desc Get Courses
// @route Get /api/v1/course
// @route Get /api/v1/bootcamp/:bootcampId/course
// access Public
exports.getCourses = asyncHandler(async (req, res, next) => {
    if (req.params.bootcampId) {
        const courses = await Course.find({ bootcamp: req.params.bootcampId });

        return res.status(200).json({
            success: true,
            count: courses.length,
            data: courses
        });
    } else {
        res.status(200).json(res.advancedResults);
    }
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

// @desc Update Course
// @route PUT /api/v1/courses/:id
// access Public
exports.updateCourse = asyncHandler(async (req, res, next) => {
    let course = await Course.findById(req.params.id);

    if (!course) {
        return next(new ErrorResponse(`Course not found with id of ${req.params.id}`, 400));
    }

    course = await Course.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    res.status(200).json({ success: true, data: course });
});

// @desc Delete Course
// @route Delete /api/v1/courses/:id
// access Private
exports.deleteCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
        return next(new ErrorResponse(`Course not found with id of ${req.params.id}`, 400));
    }
    res.status(200).json({ success: true, data: {} });
});