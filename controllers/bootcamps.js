const Bootcamp = require('../model/Bootcamp');

// @desc Get All Bootcamps
// @route Get /api/v1/bootcamp
// access Public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    if (!bootcamps) {
      res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, count: bootcamps.length, data: bootcamps });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

// @desc Get Bootcamp
// @route Get /api/v1/bootcamp/id
// access Public
exports.getBootcamp = async(req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findById(req.params.id);
        if (!bootcamp) {
          res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: bootcamp });
      } catch (err) {
        res.status(500).json({ success: false });
      }
}

// @desc Post a Bootcamp
// @route Post /api/v1/bootcamp
// access Private
exports.createBootcamp = async(req, res, next) => {
    try {
        const bootcamp = await Bootcamp.create(req.body);
        res.status(201).json({
            success: true,
            data: bootcamp
        });
    } catch(err) {
        res.status(400).json({ success: false });
    }
};

// @desc Update Bootcamp
// @route PUT /api/v1/bootcamp/id
exports.updateBootcamp = async(req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!bootcamp) {
          res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: bootcamp });
      } catch (err) {
        res.status(500).json({ success: false });
      }
}
// @desc Delete Bootcamp
// @route Delete /api/v1/bootcamp
// access Private
exports.deleteBootcamps = async(req, res, next) => {
    try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!bootcamp) {
      res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: { } });
  } catch (err) {
    res.status(500).json({ success: false });
  }
}