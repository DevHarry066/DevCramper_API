// @desc Get All Bootcamps
// @route Get /api/v1/bootcamp
// access Public
exports.getBootcamps = (req, res, next) => {
    res.status(200).json({ success: true, message: "Show All bootcamps"});
}

// @desc Get Bootcamp
// @route Get /api/v1/bootcamp/id
// access Public
exports.getBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, message: `Show bootcamp of id ${req.params.id}`});
}

// @desc Post a Bootcamp
// @route Post /api/v1/bootcamp
// access Private
exports.createBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, message: "Created new bootcamps"});
}

// @desc Update Bootcamp
// @route PUT /api/v1/bootcamp/id
exports.updateBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, message: `update bootcamp of ${req.params.id}` });
}

// @desc Delete Bootcamp
// @route Delete /api/v1/bootcamp
// access Private
exports.deleteBootcamps = (req, res, next) => {
    res.status(200).json({ success: true, message: `delete bootcamp of ${req.params.id}` });
}