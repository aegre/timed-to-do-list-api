const taskRoute = require("./routes/taskRoute");
const constants = require("./constants")

module.exports = (app) => {
    app.use(constants.BASE_ROUTE, taskRoute);
}