const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: [true, "please enter a title"],
    },

    description: {
        type: String,
        required: [true, "Please enter a description"],
    },
    image: {
        type: String,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },

    numOfComment: {
        type: Number,
        default: 0,
    },

    comments: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
            },
            name: {
                type: String,
            },
            comment: {
                type: String,
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const blogModel = mongoose.model("Blog", blogSchema);

module.exports = blogModel;
