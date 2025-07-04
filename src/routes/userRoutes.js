const express = require("express");
const {
    registerUser,
    loginUser,
    profile,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, profile);

module.exports = router;
