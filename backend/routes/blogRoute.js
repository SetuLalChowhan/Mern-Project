const express = require("express");
const {
    getAllBlogs,
    createBlog,
    getSingleBlog,
    updateBlog,
    deleteBlog,
    addComment,
    allComment,
    deleteCommentByCreator,
    getMyBlog,
} = require("../controller/blog");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

router.get("/Blogs", getAllBlogs);

router.post("/createBlog", isAuthenticated, createBlog);
router.get("/blog/:id", getSingleBlog);
router.put("/blog/:id", isAuthenticated, updateBlog);
router.delete("/blog/:id", isAuthenticated, deleteBlog);
router.put("/comment/:id", isAuthenticated, addComment);
router.get("/comment/:id", isAuthenticated, allComment);
router.delete("/comment/:id", isAuthenticated, deleteCommentByCreator);
router.get("/myBlogs", isAuthenticated, getMyBlog);

module.exports = router;
