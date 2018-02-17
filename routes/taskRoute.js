const express = require("express");
const constants = require("../constants");

//Controller module
const taskController = require("../controllers/taskController");

//Load router from express.js
const api = express.Router();

//define routes
api.get(constants.TASK_ROUTE, taskController.getAll);
api.post(constants.TASK_ROUTE, taskController.post);

//export router
module.exports = api;