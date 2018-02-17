const express = require("express");
const constants = require("../constants");

//Controller module
const taskController = require("../controllers/taskController");

//Load router from express.js
const api = express.Router();

//define routes
api.get(`${constants.TASK_ROUTE}${constants.URL_PARAM_ID}`, taskController.get);
api.get(constants.TASK_ROUTE, taskController.getAll);
api.post(constants.TASK_ROUTE, taskController.post);
api.put(`${constants.TASK_ROUTE}${constants.URL_PARAM_ID}`, taskController.put);
api.delete(`${constants.TASK_ROUTE}${constants.URL_PARAM_ID}`, taskController.delete);

//export router
module.exports = api;