const ErroResponse = require('../utils/errorResponse')

const errorHandler = (err, req, res, next) => {
    console.log(err.stack.red);

    let error = { ...err }; // copy err into error
    error.message = err.message;

    //Mongoose bad Object id
    if (err.name === "CastError") {
        const message = `Resource not found with id of ${err.value}`;
        error = new ErroResponse(message, 404);
    }

    //Mongoose duplicate key erro 
    if (err.code === 11000) {
        const message = 'Duplicate key value entered';
        error = new ErroResponse(message, 400);
    }

    //Mongoose Validation Error
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErroResponse(message, 400);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server error'
    });
};
module.exports = errorHandler;