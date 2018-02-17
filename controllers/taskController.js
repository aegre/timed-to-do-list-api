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
                res.status(500).send({message: "Error while trying to create task"})
            }else{
                res.status(200).send(result);
            }
        })
    },

    //PUT API/TASK/:id
    put: (req, res) => {
        const id = req.params.id;

    } 
}