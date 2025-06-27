require("dotenv").config();
require("./config/mongoose.js");
const express = require("express");

const app = express();

PORT = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("API is running");
});

app.listen(PORT, () =>
    console.log(`Server has started running on PORT ${PORT}`)
);
