const Task = require("../models/taskModel");
const mongoose = require("mongoose");

const createTask = async (req, res) => {
    if (!req.body || typeof req.body !== "object") {
        return res
            .status(400)
            .send({ error: "Invalid or missing request body" });
    }

    const { title, description } = req.body;
    const owner = req.user._id;

    if (!title) {
        return res.status(400).send({ error: "title is required" });
    }

    try {
        const task = await new Task({ title, description, owner });
        await task.save();

        res.status(201).send(task);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Internal server error" });
    }
};

const getAllTask = async (req, res) => {
    const tasks = await Task.find();
    res.status(200).send(tasks);
};

const getTaskById = async (req, res) => {
    const { taskId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
        return res.status(400).send({ error: "Invalid task ID format" });
    }
    try {
        const task = await Task.findById(taskId);

        if (!task) {
            return res
                .status(404)
                .send({ error: "Task with the specified id does not exists" });
        }
        res.status(200).send(task);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

//
// Additional endpoints
const getUserTasks = async (req, res) => {
    const user = req.user;
    try {
        const tasks = await Task.find({ owner: user._id });
        return res.status(200).send(tasks);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

const getUserTaskById = async (req, res) => {
    const user = req.user;
    const { taskId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
        return res.status(400).json({ error: "Invalid task ID format" });
    }

    try {
        const task = await Task.findById(taskId);

        if (task.owner !== user._id) {
            return res.status(401).send({
                error: "You did not have permission to access this task",
            });
        }

        res.status(200).send(task);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

module.exports = {
    createTask,
    getAllTask,
    getTaskById,
    getUserTasks,
    getUserTaskById,
};
