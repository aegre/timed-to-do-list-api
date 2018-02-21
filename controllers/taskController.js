const TaskModel = require("../models/TaskModel");
module.exports = {
    
    //GET API/TASK
    getAll: (req, res) => {
        TaskModel.find({},(error,result) => {
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

        //Limit of minutes, we convert it to seconds 
        if(req.body.duration && req.body.duration > 7200)
        {
            res.status(400).send({message: "El limite de minutos es 120 (7200 segundos)"});
            return;
        }
        //Get the max index 
        TaskModel.findWithMaxIndex(
            (error, result) => {
                if(error){
                    res.status(500).send({message: "Error while trying to create task"});
                }
                else{
                    //Generate a task model with the params received in the body
                    const newIndex = result && result.index != undefined ? result.index + 1 : 0;
                    const task = new TaskModel({ ... req.body, creationDate: Date.now(), index: newIndex });
                    //save model
                    task.save((errorSave, resultSave) => {
                        if(errorSave){
                            res.status(500).send({message: "Error while trying to create task"});
                        }else{
                            res.status(200).send(resultSave);
                        }
                    });
                    
                }
            }
        );
        
    },

    //PUT API/TASK/:id
    put: (req, res) => {
        const id = req.params.id;

        //It's marked as completed
        if(req.body.status && req.body.status === 1)
        {
            req.body.finishDate = Date.now();
        }
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

    //DELETE API/TASK/:id
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