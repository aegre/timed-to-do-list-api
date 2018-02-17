const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const router = require("./router");

const app = express();

//Body parser configuratiopn
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(morgan("tiny"));


//Configure routes
router(app);

module.exports = app;