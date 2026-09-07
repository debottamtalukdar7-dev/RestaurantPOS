const mongoose = require("mongoose");
const { Staff } = require("../models/staff");

async function createStaff(req, res){
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const existingStaff = await Staff.findOne({ id: req.body.id });

        if (existingStaff) {
            return res.status(201).json({
                message: "User already exists!"
            })
        }

        let salary = 0;

        switch (req.body.role) {
            case "chef":
                {
                    salary = 10000;
                    break;
                }

            case "waiter":
                {
                    salary = 6000;
                    break;
                }

            case "manager":
                {
                    salary = 20000
                    break;
                }
        }

        await Staff.create({
            id: req.body.id,
            name: req.body.name,
            role: req.body.role,
            salary: salary
        });

        return res.status(200).json({
            message: "Staff appointed successfully!"
        })

    }

    catch (err) {
        return res.status(500).json({
            message: err
        })

    }
}

async function getStaffList(req,res)
{
    const staffs = await Staff.find();

    res.status(200).json(
        {
            staffs:staffs
        }
    );
}

async function deleteStaff(req,res)
{
    const staff_id = req.body.id;
    await Staff.findOneAndDelete(
        {
            id:staff_id
        }
    )

    return res.status(202).json(
        {
            message:`Staff member with id ${staff_id} has been deleted successfully.`
        }
    )
}

async function editStaff(req,res)
{
    console.log(req.body);
    const {staff_id,parameter,value} = req.body;
    
    await Staff.findOneAndUpdate(
        
        {
            id:staff_id
        },
        
        { $set: {[parameter]: value} }
    )

    res.status(200).json(
        {
            message: `Staff member ${staff_id} has been updated.`
        }
    )
}

async function searchStaff(req,res)
{
    const fields = ["id","name","role"]
    const filters = {}

    fields.forEach((field)=>
    {
        if(req.query[field])
        {
            filters[field] = req.query[field]
        }
    })
    
    const staff_members = await Staff.find(filters)

    if(staff_members.length > 0)
    {
        res.status(200).json(staff_members)
    }

    else
    {
        res.status(404).json(
            {
                message:"Staff not found!"
            }
        );
    }
}
module.exports = { createStaff,getStaffList,deleteStaff,editStaff,searchStaff };