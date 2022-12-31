const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const Blog = require("../model/blogModel");
const ApiFeatures = require("../utils/apiFeatures");

//create Blog
exports.createBlog = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user._id;
  req.body.name = req.user.name;

  const blog= await Blog.create(req.body);

  res.status(201).json({
    success: true,
    blog,
  });
});

//get All Blogs

exports.getAllBlogs = catchAsyncError(async (req, res, next) => {
  const resultPerPage = 10;
  const blogCount = await Blog.countDocuments();
  const apiFeatures = new ApiFeatures(Blog.find(), req.query)
    .search()
    .pagination(resultPerPage);
  const blogs = await apiFeatures.query;
  res.status(200).json({
    success: true,
    blogs,
    blogCount,
  });
});

//get single Blog

exports.getSingleBlog = catchAsyncError(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return next(new ErrorHandler("Blog not Found", 404));
  }

  res.status(200).json({
    success: true,
    blog,
  });
});

//user blog

exports.getMyBlog= catchAsyncError(async (req, res, next) => {
  const myBlogs = await Blog.find({ user: req.user._id });

  if (!myBlogs) {
    return next(new ErrorHandler("You have no Blogs", 404));
  }
  res.status(200).json({
    success: true,
    myBlogs,
  });
});

//update Blog

exports.updateBlog = catchAsyncError(async (req, res, next) => {
  const { title, description, image } = req.body;

  const newUpdateData = {
    title,
    description,
    image,
    user: req.user._id,
    name: req.user.name,
  };

  const blog = await Blog.findByIdAndUpdate(req.params.id, newUpdateData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(201).json({
    success: true,
    blog,
  });
});

//delete Blog

exports.deleteBlog= catchAsyncError(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return next(new ErrorHandler("Blog  not found", 404));
  }

  await blog.remove();

  res.status(200).json({
    success: true,
    message: "Tour deleted Successfully",
  });
});

//add Comment

exports.addComment = catchAsyncError(async (req, res, next) => {
  const blog= await Blog.findById(req.params.id);

  if (!blog) {
    return next(new ErrorHandler("Blog  not found", 404));
  }

  const comment = {
    name: req.user.name,
    user: req.user._id,
    comment: req.body.comment,
  };

  const isCommented = blog.comments.find(
    (comm) => comm.user.toString() === req.user._id.toString()
  );

  if (isCommented) {
    blog.comments.forEach((comm) => {
      if (comm.user.toString() === req.user._id.toString()) {
        comm.comment = req.body.comment;
      }
    });
  } else {
    blog.comments.push(comment);
    blog.numOfComment = blog.comments.length;
  }

  await blog.save({ validateBeforeSave: false });

  res.status(201).json({
    success: true,
    blog,
  });
});

//all comments of sigle blog

exports.allComment = catchAsyncError(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return next(new ErrorHandler("Blog  not found", 404));
  }

  res.status(200).json({
    success: true,
    comments: blog.comments,
  });
});

//comment delete by creator

exports.deleteCommentByCreator = catchAsyncError(async (req, res, next) => {
  const { commentId } = req.query;

  const { id } = req.params;

  const blog = await Blog.findById(id);

  if (!blog) {
    return next(new ErrorHandler("Blog not found", 404));
  }

  if (blog.user.toString() !== req.user._id.toString()) {
    return next(new ErrorHandler("You are not creator for this post", 400));
  }
  const comments = blog.comments.filter((comm) => {
    return comm._id.toString() !== commentId.toString();
  });

  const numOfComment = comments.length;
  const newData = {
    comments,
    numOfComment,
  };

   const updateBlog = await Blog.findByIdAndUpdate(id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(201).json({
    success: true,
    message: "comment Deleted",
    updateBlog
  });
});
