const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const brcypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a name"],
    },
    email: {
        type: String,
        required: [true, "Please enter a Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password: {
        type: String,
        required: [true, "Please Enter a email"],
        minLength: [8, "Password should be greater than 8 Character"],
    },
    role: {
        type: String,
        default: "user",
    },
    image: {
        type: String,
        required: [true, "Please enter your image"]
    },
});

// hash Password before user save
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await brcypt.hash(this.password, 10);
});

// JWt Token

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
};

//compare password

userSchema.methods.comparePassword = async function (Inputpassword) {
    return await brcypt.compare(Inputpassword, this.password);
};
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
