const mongoose = require('mongoose');
require("dotenv").config();

const connectwithDB= ()=>{
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(console.log("DB connected Sucessfully"))
    .catch((error)=>{
        console.log("DB facing connection");
        console.log(error);
        process.exit(1);
    })
};
module.exports = connectwithDB;