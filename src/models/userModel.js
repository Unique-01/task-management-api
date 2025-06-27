require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
    },
    refreshToken: {
        type: String,
    },
});

UserSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 10);
    }

    next();
});

UserSchema.methods.generateAccessToken = async function () {
    const user = this;

    const accessToken = jwt.sign(
        { _id: user._id.toString() },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: "5h" }
    );

    return accessToken;
};

UserSchema.methods.generateRefreshToken = async function () {
    const user = this;
    const refreshToken = jwt.sign(
        { _id: user._id.toString() },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "1w" }
    );
    user.refreshToken = refreshToken;
    await user.save();
    return refreshToken;
};

UserSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.refreshToken;

    return userObject;
};

const User = new mongoose.model("User", UserSchema);

module.exports = User;
