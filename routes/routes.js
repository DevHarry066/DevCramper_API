const express = require('express');
const router = express.Router({ mergeParams: true });


//Other routes require
const courseRouter = require('./courses');

//Re-route into other resources routes
router.use('/:bootcampId/courses', courseRouter);

const { getBootcamps, getBootcamp, createBootcamp, updateBootcamp, deleteBootcamps, getBootcampsInRadius, bootcampPhotoUpload } =
    require('../controllers/bootcamps')

router.route('/').get(getBootcamps).post(createBootcamp);

router.route('/radius/:zipCode/:distance').get(getBootcampsInRadius);

router.route('/:id').get(getBootcamp).put(updateBootcamp).delete(deleteBootcamps);

router.route('/:id/photos').put(bootcampPhotoUpload);

module.exports = router