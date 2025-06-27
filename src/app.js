require("dotenv").config();
require("./config/mongoose.js");
const express = require("express");

const userRouter = require("./routes/userRoutes.js");
const taskRouter = require("./routes/taskRoutes.js");

const app = express();

PORT = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("API is running");
});

app.use("/api/user", userRouter);
app.use("/api/tasks", taskRouter);

app.listen(PORT, () =>
    console.log(`Server has started running on PORT ${PORT}`)
);
