const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    phone: {
        type:String,
        required:true
    },
    address: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    gender: {
        type:String,
        required:false
    }
});

//collection
const User = new mongoose.model("User", userSchema);
module.exports = User;