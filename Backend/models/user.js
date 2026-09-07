const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    username:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },

    password:{
        type:String,
        required:true
    },

    question:
    {
        type:String,
        required:true
    },

    answer:
    {
        type:String,
        required:true
    }

},{
    timestamps:true
});

const User = mongoose.model("User",userSchema);

module.exports = User;