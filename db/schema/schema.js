const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    email:String,
    password:String,
    subscription:{
        type: Object,
        
    }
})
const user = new mongoose.model("User",userSchema)
module.exports = user;