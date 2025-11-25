const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

exports.verifyToken  = (req, res, next) => {
    const token = req.headers["authorization"]?.split[" "][1];
    console.log(token);
    if(!token) {
        res.status(401).json({message: "unauthorized"});
    }

    jwt.verify(token, process.env.SECRET_KEY , (err, decoded) => {
        if(err){
            res.status(403).json({message: "Invalid Token"});
        }

        res.user = decoded;
        next();
    })
}