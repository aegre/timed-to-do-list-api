const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//model definition
const taskSchema = new Schema({
    description: String,
    elapsed: Number,
    index: Number,
    status: Number,
    totalDuration: Number
});

//model class
const ModelClass = mongoose.model('task', taskSchema);

module.exports = ModelClass;
