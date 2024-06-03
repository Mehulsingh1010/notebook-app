const mongoose = require("mongoose");

const mongoURI= "mongodb+srv://mehulsingh2022:DolZNaJXnUH13yqm@i-note.gxohpk2.mongodb.net/?retryWrites=true";

const connectmongo =()=>{
    mongoose.connect(mongoURI).then(
        console.log("connected succesfully!"))
    }
module.exports=connectmongo
