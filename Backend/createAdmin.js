const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const User = require("./models/user");

async function createAdmin() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const existingUser = await User.findOne({ username: "admin" });

        if (existingUser) {
            console.log("Admin already exists!");
            process.exit();
        }

        const hashedPassword = await bcrypt.hash("admin123", 10);
        const hashedAnswer = await bcrypt.hash("Blue",10);

        await User.create({
            username: "admin",
            password: hashedPassword,
            question:"What is the colour of the sky?",
            answer:hashedAnswer
        });

        console.log("Admin created successfully!");
        process.exit();

    } 
    
    catch (err) {
        console.log(err);
        process.exit();
    }
}
createAdmin();