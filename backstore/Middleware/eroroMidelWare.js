const ApiError = require("../utils/apiError");

// For development mode:
const sendErrorForDev = (err, res) => {
    return res.status(err.statusCode).json({
        status: err.status,  
        error: err,          // error details (useful for debugging)
        message: err.message,
        stack: err.stack,     
    });
};

// For production mode:
const sendErrorForProd = (err, res) => {
    // Hide detailed error info in production for security purposes
    return res.status(err.statusCode).json({
        status: err.status,  
        message: err.message, 
    });
};

// Custom error handling for JWT errors:
const handleJwtInvalidSignature = () => {
    return new ApiError('Invalid token, please login again', 401);
};

const handleJwtExpired = () => {
    return new ApiError('Expired token, please login again', 401);
};

// Global error handler:
const globalError = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500; 
    err.status = err.status || 'error';  
    // Handle specific JWT errors:
    if (err.name === 'JsonWebTokenError') {
        err = handleJwtInvalidSignature();
    }
    if (err.name === 'TokenExpiredError') {
        err = handleJwtExpired();
    }

    // In development, send detailed error info:
    if (process.env.NODE_ENV === 'development') {
        sendErrorForDev(err, res);
    } else {
        // In production, send a generic error message:
        sendErrorForProd(err, res);
    }

    // Optionally, log errors in production (using a logging service like Winston)
    if (process.env.NODE_ENV === 'production') {
        console.error(err); 
    }
};

module.exports = globalError;
