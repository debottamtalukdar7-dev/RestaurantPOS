const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema(
    {
        tablenumber:
        {
            type:String,
            required:true

        },

        seats:
        {
            type: String,
            required:true
        },

        status:
        {
            type:String,
            required:true
        }
    }
)

const Table = mongoose.model("Table",tableSchema);

module.exports = {Table};