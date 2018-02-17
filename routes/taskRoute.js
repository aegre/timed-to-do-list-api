const express = require("express");

//Controller module
const taskController = require("../controllers/taskController");

//Load router from express.js
const api = express.Router();

//define routes
api.get("/tasks", taskController.getAll);

//export router
module.exports = api;