const TaskModel = require("../models/TaskModel");
module.exports = {
    
    //GET API/TAKS
    getAll: (req, res) => {
        res.status(200).send({message: "good"})
    },

    //POST API/TAKS
    post: (req, res) =>{
        const task = new TaskModel();
        
        //copy all the properties to the model
        Object.assign(task, req.body);

        //save model
        task.save((error, result) => {
            if(error){
                res.status(500).send({message: "Cannot create task"})
            }else{
                res.status(200).send(result);
            }
        })
    }
}