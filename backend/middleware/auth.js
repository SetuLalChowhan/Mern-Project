const jwt = require("jsonwebtoken");
const catchAsyncError = require("./catchAsyncError");
const User = require("../model/userModel");
const ErrorHandler = require("../utils/ErrorHandler");

const isAuthenticated = catchAsyncError(async (req, res, next) => {

    let token;
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        token = req.headers.authorization.split(" ")[1]
       }
    
    if (!token) {
        return next(new ErrorHandler("Please login to access this resource", 401));
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);

    next();
});

const authorizeRoles = (roles) => {
    return (req, res, next) => {
        if (req.user.role !== "admin") {
            return next(new ErrorHandler("This User can not access this resource", 403));
        }
        next();
    };
};

module.exports = { isAuthenticated, authorizeRoles };
