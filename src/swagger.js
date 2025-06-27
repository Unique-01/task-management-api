require("dotenv").config();
const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const doc = {
    info: {
        title: "Task Management API",
        description: "Documentation for task management backend",
    },
    host: process.env.HOST,
};

const outputFile = "./swagger-output.json";
const routes = ["./app.js"];

swaggerAutogen(outputFile, routes, doc);
