const bcrypt = require("bcrypt");

async function generateHash(){
    
    const password = "admin123";
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save()
    console.log(hashedPassword);
}

generateHash();