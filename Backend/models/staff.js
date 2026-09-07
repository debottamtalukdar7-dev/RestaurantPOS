const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
    
    {
        id:
        {
            type:String,
            required:true
        },

        name:
        {
            type:String,
            required:true
        },

        role:
        {
            type:String,
            required:true
        },

        salary:
        {
            type:Number,
            required:false
        }
    }
)

const Staff = mongoose.model("Staff",staffSchema)

module.exports = {Staff};