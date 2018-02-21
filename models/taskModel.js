const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//model definition
const taskSchema = new Schema({
    creationDate: { type: Date, default: Date.now()},
    description: { type: String, default: "" },
    duration: { type: Number, default: 0 },
    elapsed: { type: Number, default: 0 },
    finishDate: { type: Date },
    index: { type: Number },
    status: { type: Number, default: 0 },
    title: { type: String, required: true},
});



//model class
const ModelClass = mongoose.model('task', taskSchema);

ModelClass.findWithMaxIndex = function(cb) {
    return ModelClass.findOne({ status: 0 }).sort("-index").exec(cb);
};


module.exports = ModelClass;
