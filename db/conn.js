const mongoose = require("mongoose")
require("dotenv").config()
const DB = process.env.MONGODB_URI||process.env.DB;
mongoose.connect(DB,{
    useCreateIndex:true,
    useFindAndModify:false,
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("Connected")
}).catch((e)=>{
    console.log(e)
})


