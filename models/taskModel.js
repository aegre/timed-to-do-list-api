const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//model definition
const taskSchema = new Schema({
    description: { type: String, default: "" },
    elapsed: { type: Number, default: 0 },
    index: { type: Number, required: true },
    status: { type: Number, default: 0 },
    duration: { type: Number, default: 0 }
});

//model class
const ModelClass = mongoose.model('task', taskSchema);

module.exports = ModelClass;
