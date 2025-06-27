const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
    if (!req.body || typeof req.body !== "object") {
        return res
            .status(400)
            .send({ error: "Invalid or missing request body" });
    }

    const { username, password } = req.body;
    const userExists = await User.findOne({ username });

    if (userExists) {
        return res
            .status(400)
            .send({ error: "User with that username already exists" });
    }
    const user = new User({ username, password });

    try {
        await user.save();
        return res.status(201).send(user);
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .send({ error: "Unable to register user, Please try again later" });
    }
};

const loginUser = async (req, res) => {
    if (!req.body || typeof req.body !== "object") {
        return res
            .status(400)
            .send({ error: "Invalid or missing request body" });
    }

    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user || !user.password) {
        return res.status(400).send({ error: "Invalid username or password" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
        return res.status(400).send({ error: "Invalid Password" });
    }

    try {
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        return res
            .status(200)
            .send({ accessToken: accessToken, refreshToken: refreshToken });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
};

const profile = async (req, res) => {
    res.status(200).send(req.user);
};

module.exports = { registerUser, loginUser, profile };
