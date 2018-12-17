const mongoose = require("mongoose");
const app = require("./app")
const port = process.env.Port || 1234;


//Mongo DB Connection
mongoose.connect("mongodb://localhost:27017/timedToDo",(error, response) =>{
    if(error)
    {
        throw error;
    }
    else{
        console.log("Database conection succesfull");
        app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        })
    }
});

