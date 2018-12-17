const express = require("express");
const constants = require("../constants");

//Controller module
const dummyController = require("../controllers/dummyController");

//Load router from express.js
const api = express.Router();

//define routes
api.get(constants.DUMMY_ROUTE, dummyController.get);

//export router
module.exports = api;