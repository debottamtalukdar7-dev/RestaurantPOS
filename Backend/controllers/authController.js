const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
    const {username, password} = req.body;
    console.log("Login API hit");
    console.log(username);
    console.log(password);

    const user = await User.findOne({ username });

    console.log(user);

    if (!user) {
    return res.status(401).json({
        message: "Invalid Username"
    });
}

    const isMatch = await bcrypt.compare(password, user.password);

    // console.log(isMatch);
    if (!isMatch) {
    return res.status(401).json({
        message: "Invalid Password"
    });
}
    
    const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        },
        process.env.jwt_SECRET,
        {
            expiresIn: "1d"
        }

);
    
    return res.status(200).json({
        message: "Login Successfull",
        token
    });

    res.json({
        message: "Login route working"
    });
};

const changePassword = async (req,res) =>
{
    const {username,answer,newpassword,confirmpassword} = req.body;
    console.log("Forget API hit!");
    
    const user = await User.findOne({ username });

    console.log(user);

    if (!user) 
    {
        return res.status(401).json({
            message: "Invalid Username"
        });

    }

    const isMatch = await bcrypt.compare(answer, user.answer);

    if(isMatch == false)
    {
        return res.status(401).json({
            message:"Wrong Answer!"
        })
    }

    if(newpassword != confirmpassword)
    {
        return res.status(401).json({
            message : "Password is not matched."
        });
    }

    else
    {
        const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        },
        process.env.jwt_SECRET,
        {
            expiresIn: "1d"
        }

        );

        const hashedPassword = await bcrypt.hash(newpassword, 10);
        user.password = hashedPassword;
        await user.save()

        // res.json({
        // message: "Login route working"
        // });

        return res.status(200).json({
        message: "Password updated successfully!",
        token
        });

    }

    
}

async function updateProfile(req, res) {
    const { username, password, question, answer } = req.body;

    const user = await User.findOne(
        {
            username: username
        }
    )

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const old_name = user.username;
    const old_password = user.password;
    const old_question = user.question;
    const old_answer = user.answer;

    if (old_name != username || question != undefined) {
        user.username = username;
    }

    if (await bcrypt.compare(password, old_password) == false) {
        user.password = await bcrypt.hash(password,10);
    }

    if (question != old_question || question != "" || question != undefined) {
        user.question = question;
    }

    if (answer != old_answer && answer != "") {
        user.answer = await bcrypt.hash(answer, 10);
    }

    await user.save()

    return res.status(201).send(
        {
            message: "Saved changes sucessfully!"
        }
    )

}

module.exports = { loginUser,changePassword,updateProfile};