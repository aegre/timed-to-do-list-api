const TaskModel = require('./../models/taskModel');
const randomNumberHelper = require("../helpers/randomNumber");

module.exports = {
    //GET API/Generate-dummy-data
    get: async (req, res) => {
        const tasks = [];
        for(let i = 0; i <50; i++)
        {
            //get the random totalTime
            const duration = randomNumberHelper.getRandomNumber(1,120)*60;
            //get the random elapsed between 80% and 100% of total
            const elapsed = randomNumberHelper.getRandomNumber( parseInt(duration * 0.8), duration);
            //get how many days from today random of course
            const days = randomNumberHelper.getRandomNumber(0,7);

            //Now get the exact date
            const finishDate = new Date();
            finishDate.setDate(finishDate.getDate() - days);
            
            const title = `Dummy-${i+1}`;
            const description = "Generated task by dummy method";

            //push the tasks in the queue
            tasks.push({ duration, elapsed, title, description, finishDate, status: 1 })
        }

        for(let i = 0; i < tasks.length; i++)
        {
            try{
                const newIndex = await TaskModel.getMaxIndex() + 1;
                //Generate a task model with all the parameters
                const task = new TaskModel({ ...tasks[i], index: newIndex });
                //save model  
                savedTask = await task.save();
            }
            catch(err) {
                console.log(err);
            }
        }

        res.status(200).send(tasks);
    }
}
