const {Table} = require("../models/table");

const findTable = async (req,res) =>
{
    
}

const addTable = async (req,res) => {
    
    const {tablenumber,seats,status} = req.body;

    const table = await Table.findOne({tablenumber:Number(tablenumber)});

    if(table)
    {
        return res.status(409).json({message:`Table ${tablenumber} is already exists!`});
    }

    const response = await Table.create(
        {
            tablenumber:Number(tablenumber),
            seats:Number(seats),
            status:status
            
        }
    )

    return res.status(200).json({
        message:"Table is added!"
    })
}

const removeTable = async (req,res) =>
{
    const id = req.params.tablenumber;

    try
    {
        await Table.deleteOne({tablenumber:id})
        return res.status(200).json({"message":`Table${id} is removed  successfully`});
    }

    catch(err)
    {
        return res.json({"message":"Error"});
    }
}

const getTableList = async (req,res) =>
{
    const tables = await Table.find();

    return res.status(200).json({tables:tables});
}

const editTable = async(req,res) =>
{
    const {tablenumber,seats,status} = req.body;
    const id = req.params.id;

    if(tablenumber != id)
    {
        const table = await Table.findOne({tablenumber:tablenumber});

        if(table)
        {
            res.status(409).json({message:`Table${tablenumber} already exists!`});
        }

        else
        {
            await Table.findOneAndUpdate(
                
                { tablenumber: tablenumber},
                {tablenumber,seats,status},
                { new: true, runValidators: true }
            )

            res.status(200).json({message:"Updated Successfully!"});
        }
    }

    else
    {
        await Table.findOneAndUpdate(
            {tablenumber:tablenumber},
            {tablenumber,seats,status},
            { new: true, runValidators: true }
        )

        res.status(200).json({ message: "Updated Successfully!" });
    }
}

module.exports = {addTable,removeTable,getTableList,editTable};