const Bootcamp = require('../model/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocoder');

// @desc Get All Bootcamps
// @route Get /api/v1/bootcamp
// access Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  let query;

  //copy query string
  const reqQuery = { ...req.query };

  //Fields to exclude
  const removeFields = ['select', 'sort'];

  //Loop over all fields & remove fields from queryParameters
  removeFields.forEach(param => delete reqQuery[param]);

  //create query string
  let queryString = JSON.stringify(reqQuery);

  //create operators ($gt, $lte, $gte, $lt, $in)
  queryString = queryString.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  //Finding resources
  query = Bootcamp.find(JSON.parse(queryString));

  //Select Fields by query string values
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  //Sort Fields by query string values
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    //default sort by creation time
    // query = query.sort({ createdAt: -1 });
  }

  //Finally send the query to the server
  const bootcamps = await query;

  //Result from the server to the client

  if (!bootcamps) {
    return next(new ErrorResponse(`Bootcamps not found`, 400));
  }
  res.status(200).json({ success: true, count: bootcamps.length, data: bootcamps });
});

// @desc Get Bootcamp
// @route Get /api/v1/bootcamp/id
// access Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 400));
  }
  res.status(200).json({ success: true, data: bootcamp });
});

// @desc Post a Bootcamp
// @route Post /api/v1/bootcamp
// access Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({
    success: true,
    data: bootcamp
  });
});

// @desc Update Bootcamp
// @route PUT /api/v1/bootcamp/id
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!bootcamp) {
    return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 400));
  }
  res.status(200).json({ success: true, data: bootcamp });
});
// @desc Delete Bootcamp
// @route Delete /api/v1/bootcamp
// access Private
exports.deleteBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
  if (!bootcamp) {
    return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 400));
  }
  res.status(200).json({ success: true, data: {} });
});

// @desc Get Bootcamp within Radius
// @route Get /api/v1/bootcamp/radius/:zipCode/:distance
// access Public
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;
  //Get latitude and longitude
  const loc = await Geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;


  //calc radius using radians
  const radius = distance / 3963.0;
  const bootcamps = await Bootcamp.find({
    location: {
      $geoWithin: {
        $centerSphere: [[lat, lng], radius]
      }
    }
  });
  res.status(200).json({ success: true, count: bootcamps.length, data: bootcamps });
});