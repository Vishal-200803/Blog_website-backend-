const express = require('express')
const app = express()
require("dotenv").config();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());
const blog = require("./routes/blog")

app.use("/api/v1", blog);
const connectwithDB = require('./config/database')
connectwithDB();

app.listen(PORT, ()=>{
    console.log("App is running succesfully on PORT no ${PORT}");
})

app.get("/", (req,res)=>{
    res.send("This is a homepage");
})
