const express = require('express');
const router = express.Router();

const { getBootcamps, getBootcamp, createBootcamp, updateBootcamp, deleteBootcamps, getBootcampsInRadius } =
    require('../controllers/bootcamps')

router.route('/').get(getBootcamps).post(createBootcamp);

router.route('/radius/:zipCode/:distance').get(getBootcampsInRadius);

router.route('/:id').get(getBootcamp).put(updateBootcamp).delete(deleteBootcamps);

module.exports = router