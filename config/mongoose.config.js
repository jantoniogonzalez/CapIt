const mongoose = require("mongoose");

const dBName = "cap-it";

mongoose.connect("mongodb://localhost/"+dBName, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(()=>console.log("You are connected to the database called "+ dBName))
    .catch((err)=>{
        console.log("There was an error connecting to the database called "+ dBName );
        console.log(err);
    })