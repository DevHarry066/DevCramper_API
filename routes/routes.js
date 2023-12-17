const express = require('express');
const router = express.Router();

const { getBootcamps, getBootcamp, createBootcamp, updateBootcamp, deleteBootcamps } = 
require('../controllers/bootcamps')

router.route('/').get(getBootcamps).post(createBootcamp);

router.route('/:id').get(getBootcamp).put(updateBootcamp).delete(deleteBootcamps);

module.exports = router