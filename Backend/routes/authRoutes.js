const express = require("express");
const {loginUser,changePassword,updateProfile} = require("../controllers/authController");
const verifyToken = require("../middleware/authMiddleware");
const { createStaff,getStaffList,deleteStaff,editStaff,searchStaff } = require("../controllers/staffManagement");
const {addTable,removeTable,getTableList,editTable} = require("../controllers/tableController")

const authRouter = express.Router();
const staffRouter = express.Router();
const TableRouter = express.Router();

authRouter.post("/login",loginUser);
authRouter.post("/update",updateProfile);
authRouter.post("/forget",changePassword)
authRouter.get("/profile", verifyToken, (req, res)=>{
    res.status(200).json({
        message: "Welcome to Dashboard",
        user: req.user 
    });
});

staffRouter.post("/appoint",createStaff);
staffRouter.get("/list",getStaffList);
staffRouter.post("/delete",deleteStaff);
staffRouter.post("/edit",editStaff);
staffRouter.get("/search",searchStaff);

TableRouter.get("/list",getTableList);
TableRouter.patch('/update/:id',editTable)
TableRouter.post("/add",addTable)
TableRouter.delete("/delete/:tablenumber",removeTable)

module.exports = {authRouter,staffRouter,TableRouter};