const express = require('express');
const router = express.Router({ mergeParams: true });
const advancedResults = require('../middleware/advancedResults');
const Bootcamp = require('../model/Bootcamp');
const { protect } = require('../middleware/auth');


//Other routes require
const courseRouter = require('./courses');

//Re-route into other resources routes
router.use('/:bootcampId/courses', courseRouter);

const { getBootcamps, getBootcamp, createBootcamp, updateBootcamp, deleteBootcamps, getBootcampsInRadius, bootcampPhotoUpload } =
    require('../controllers/bootcamps')

router.route('/').get(advancedResults(Bootcamp, 'courses'), getBootcamps).post(protect, createBootcamp);

router.route('/radius/:zipCode/:distance').get(getBootcampsInRadius);

router.route('/:id').get(getBootcamp).put(protect, updateBootcamp).delete(protect, deleteBootcamps);

router.route('/:id/photos').put(protect, bootcampPhotoUpload);

module.exports = router