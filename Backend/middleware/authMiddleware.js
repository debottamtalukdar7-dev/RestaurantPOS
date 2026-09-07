const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if(!token){
        return res.status(401).json({
            message: "Access Denied"
        });
    }
    const jwtToken = token.split(" ")[1];

    try{
        const decoded = jwt.verify(
            jwtToken, 
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();
    }
    
    catch(error){
        return res.status(401).json({
            message: "Invalid Token"
        });
    }
}

module.exports = verifyToken;