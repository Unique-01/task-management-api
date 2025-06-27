const express = require("express");
const {
    createTask,
    getAllTask,
    getTaskById,
    getUserTasks,
    getUserTaskById,
} = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createTask);
router.get("/", getAllTask);
router.get("/user", authMiddleware, getUserTasks);
router.get("/:taskId", getTaskById);
router.get("/user/:taskId", authMiddleware, getUserTaskById);

module.exports = router;
