const taskRoute = require("./routes/taskRoute");
const constants = require("./constants")
const dummyRoute = require("./routes/dummyRoute")

module.exports = (app) => {
    app.use(constants.BASE_ROUTE, taskRoute);
    app.use(constants.BASE_ROUTE, dummyRoute);
}