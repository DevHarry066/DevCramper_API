const Bootcamp = require('../model/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocoder');

// @desc Get All Bootcamps
// @route Get /api/v1/bootcamp
// access Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  let query;
  let queryString = JSON.stringify(req.query);
  queryString = queryString.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
  query = Bootcamp.find(JSON.parse(queryString));
  const bootcamps = await query;
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