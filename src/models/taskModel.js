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

ModelClass.findWithMaxIndex = () => {
    return ModelClass.findOne({ status: 0 }).sort("-index").exec();
};

ModelClass.getMaxIndex = async () => {
    const maxTask = await ModelClass.findWithMaxIndex();
    return (maxTask && maxTask.index != undefined ? maxTask.index : -1);
}

//Update all the following indexes to decrease 1 
// it is used for completed, delete
ModelClass.decreaseTheFollowingIndex = function(index){
    return ModelClass.update({ index: { $gt: index }}, { $inc: { index: -1 }} , {multi: true} );
}

ModelClass.moveIndexes = function(oldIndex, newIndex){
    let inc = {};
    var index = {}
    //The new index is lower, increase affected tasks
    if(oldIndex > newIndex)
    {
        //move forward
        inc = { index: 1 };
        index =
        { 
            $gte: newIndex,
            $lt: oldIndex 
        }
        return ModelClass.update({ index }, { $inc: inc }, { multi: true});
    }
    //the new index is greater, decrease the affected tasks
    else if(newIndex > oldIndex)
    {
        //move backward
        inc = { index: -1 };
        index =
        { 
            $gte: oldIndex, 
            $lte: newIndex
        }
        return ModelClass.update({ index }, { $inc: inc }, { multi: true});
    }

    
}


module.exports = ModelClass;
