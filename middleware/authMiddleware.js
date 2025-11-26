const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

exports.verifyToken  = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    console.log(token);
    if(!token) {
        return res.status(401).json({message: "unauthorized"});
    }

    jwt.verify(token, process.env.SECRET_KEY , (err, decoded) => {
        if(err){
            return res.status(403).json({message: "Invalid Token"});
        }

        req.user = decoded;
        next();
    })
}