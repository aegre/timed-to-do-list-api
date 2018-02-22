const TaskModel = require("../models/TaskModel");
module.exports = {
    
    //GET API/TASK
    getAll: async (req, res) => {

        try{
            const tasks = await TaskModel.find({}, null, { sort: "index" });
            res.status(200).send(tasks);
        } 
        catch(err) {
            res.status(500).send({message: "Error while trying to fetch list of tasks"});
        }
    },

    //GET API/TASK/:id
    get: async (req, res) => {
        const id = req.params.id;

        try{
            const currentTask = await TaskModel.findById(id);
            res.status(200).send(currentTask);
        }
        catch(err) {
            res.status(500).send({message: "Error while trying to fetch a task"});
        }
    },

    //POST API/TASK
    post: async (req, res) => {

        //Limit of minutes, we convert it to seconds 
        if(req.body.duration && req.body.duration > 7200)
        {
            res.status(400).send({message: "El limite de minutos es 120 (7200 segundos)"});
            return;
        }
        
        try {
            const newIndex = await TaskModel.getMaxIndex() + 1;
            //Generate a task model with all the parameters
            const task = new TaskModel({ ... req.body, creationDate: Date.now(), index: newIndex });
            //save model  
            savedTask = await task.save();
            //return the saved task
            res.status(200).send(savedTask);
        }
        catch(err) {
            res.status(500).send({message: "Error while trying to create task"});
        }
                
    },

    //PUT API/TASK/:id
    put: async (req, res) => {
        const id = req.params.id;
        let updatedProps = {  ...req.body };

        try {
            const currentTask = await TaskModel.findById(id);
            
            //If the task has been accomplished set finish date && decrease the following indexes
            if(currentTask.status == 0 && (updatedProps.status && updatedProps.status == 1))
            {
                updatedProps = { ...updatedProps, finishDate: Date.now() };
                await TaskModel.decreaseTheFollowingIndex(currentTask.index);
            }

            //Find and update the model, return the updated one
            const result = await TaskModel.findByIdAndUpdate(id, updatedProps, { new: true });
            res.status(200).send(result);   
        }
        catch(err){
            console.log(err);
            res.status(500).send({message: "Error while trying to update task"});
        }
    },

    //DELETE API/TASK/:id
    delete: async (req, res) => {
        const id = req.params.id;
        try {
            const currentTask = await TaskModel.findById(id);
            await TaskModel.decreaseTheFollowingIndex(currentTask.index);
            const result = await TaskModel.findByIdAndRemove(id);
            res.status(200).send(result);
        }
        catch(err){
            res.status(500).send({message: "Error while trying to delete task"});
        }
    }
}