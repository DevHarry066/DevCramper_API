const Bootcamp = require('../model/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocoder');
const path = require('path');

// @desc Get All Bootcamps
// @route Get /api/v1/bootcamp
// access Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
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
  req.body.user = req.user.id;
  const bootcampOne = await Bootcamp.findOne({ user: req.user.id });

  if (bootcampOne && req.user.role !== 'admin') {
    return next(new ErrorResponse(`User already has a bootcamp`, 400));
  }
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

// @desc Upload Bootcamp photo
// @route Put /api/v1/bootcamps/:id/photos
// access Private
exports.bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
  console.log("uploading bootcamp");
  const bootcamp = await Bootcamp.findById(req.params.id);
  console.log('bootcampPhotoUpload');
  if (!bootcamp) {
    return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 400));
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file for bootcamp ${req.params.id}`, 400));
  }

  const file = req.files.file;

  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload an image file for bootcamp ${req.params.id}`, 400));
  }

  //check file size
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(new ErrorResponse(`Please upload an image less than ${process.env.MAX_FILE_UPLOAD / 1000000}MB for bootcamp ${req.params.id}`, 400));
  }

  // Create custome filename
  file.name = `photo_${bootcamp._id}${path.extname(file.name)}`;
  console.log(file.name);

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name });

    res.status(200).json({
      success: true,
      data: file.name
    });
  });
});