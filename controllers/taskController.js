const TaskModel = require("../models/TaskModel");
module.exports = {
    
    //GET API/TASK
    getAll: (req, res) => {
        TaskModel.find({}, (error,result) => {
            if(error){
                res.status(500).send({message: "Error while trying to fetch list of tasks"});
            }
            else {
                res.status(200).send(result);
            }
        });
    },

    //GET API/TASK/:id
    get: (req, res) => {
        const id = req.params.id;
        TaskModel.findById(id, (error, result) => {
            if(error) {
                res.status(500).send({message: "Error while trying to fetch a task"})
            }
            else {
                res.status(200).send(result);
            }
        });

    },

    //POST API/TASK
    post: (req, res) => {

        //Generate a task model with the params received in the body
        const task = new TaskModel({ ... req.body });
        
        //save model
        task.save((error, result) => {
            if(error){
                res.status(500).send({message: "Error while trying to create task"});
            }else{
                res.status(200).send(result);
            }
        })
    },

    //PUT API/TASK/:id
    put: (req, res) => {
        const id = req.params.id;
        //Find and update the model, return th eupdated one
        TaskModel.findByIdAndUpdate(id, req.body, {new: true}, (error, result) => {
            if(error){
                res.status(500).send({message: "Error while trying to update task"});
            }
            else{
                if(!result) {
                    res.status(404).send({message: "Task not found"});
                }
                else{
                    res.status(200).send(result);
                }
            }
        });
    },

    delete: (req, res) => {
        const id = req.params.id;
        TaskModel.findByIdAndRemove(id, (error, result) => {
            if(error) {
                res.status(500).send({message: "Error while trying to delete task"});
            }
            else {
                res.status(200).send(result);
            }
        });
    }
}