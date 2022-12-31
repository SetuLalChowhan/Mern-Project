const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../model/userModel");
const ErrorHandler = require("../utils/ErrorHandler");
const sendToken = require("../utils/sendToken");
const Blog = require('../model/blogModel')

//create User
exports.createUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password, confirmPassword, image } = req.body;

    const user = await User.findOne({ email });

    if (user) {
        return next(new ErrorHandler("User already Exist", 400));
    }
    if (password !== confirmPassword) {
        return next(new ErrorHandler("Password must match", 400));
    }

    const newUser = User({
        name,
        email,
        password,
        image,
    });

    await newUser.save();

    sendToken(newUser, 201, res);
});

//login

exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return next(new ErrorHandler("Invalid Credential", 401));
    }
    const isPassword = await user.comparePassword(password);
    if (!isPassword) {
        return next(new ErrorHandler("Invalid Credential", 401));
    }

    sendToken(user, 200, res);
});

//logout

exports.logOut = catchAsyncError(async (req, res, next) => {
   const token = req.headers.authorization.split(" ")[1]

   console.log(token)
    res.status(200).json({
        success: true,
        message: "LoggedOut",
    });
});

// get all User --admin

exports.getAllUser = catchAsyncError(async (req, res, next) => {
    const users = await User.find();
    const totalUser = users.length;

    res.status(200).json({ success: true, users, totalUser });
});

// getSingle User --admin

exports.getSingleUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler("User does not found", 404));
    }

    res.status(200).json({
        success: true,
        user,
    });
});

// update  user Profile

exports.updateUserProfile = catchAsyncError(async (req, res, next) => {

    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    const blogs = await Blog.find({user:req.user._id})

    blogs.forEach(async(blog)=>{

       if(req.body.name){
        blog.name =req.body.name

        await blog.save()
       }
      
    })
   sendToken(user,201,res)
});

//user role change --admin
exports.updateRole = catchAsyncError(async (req, res, next) => {
    const { name, email, role } = req.body;
    const updateRoleData = {
        role,
    };

    const user = await User.findByIdAndUpdate(req.params.id, updateRoleData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        user,
    });
});

// user delete --admin

exports.deleteUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler("User does not found", 404));
    }

    await user.remove();

    res.status(200).json({
        success: true,
        message: "User deleted",
    });
});
