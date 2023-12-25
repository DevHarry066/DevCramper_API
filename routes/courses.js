const express = require('express');
const router = express.Router({ mergeParams: true });
const advancedResults = require('../middleware/advancedResults');
const Course = require('../model/Course');
const { protect, authorize } = require('../middleware/auth');

const { getCourses, getCourse, addCourse, updateCourse, deleteCourse } = require('../controllers/courses');

router.route('/').get(advancedResults(Course, {
    path: 'bootcamp',
    select: 'title description'
}),
    getCourses).post(protect, authorize('publisher', 'admin'), addCourse);
router.route('/:id').get(getCourse).put(protect, authorize('publisher', 'admin'), updateCourse).delete(protect, authorize('publisher', 'admin'), deleteCourse);

module.exports = router;
