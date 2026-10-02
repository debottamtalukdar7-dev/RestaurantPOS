const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const {authRouter,staffRouter,TableRouter} = require("./routes/authRoutes");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/staff", staffRouter);
app.use("/api/table",TableRouter);

connectDB();

const PORT = process.env.PORT || 5000;

app.get("/", (req,res)=>{
    res.send("Server is running...");
});

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});