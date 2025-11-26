const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

exports.requireRole = (...allowedRoles) => {
    return (req,res, next) => {
        const role = req.user.role;
        if(role === "admin") {
            return next();
        }
        if(!allowedRoles.includes(role)) {
            return res.status(403).json({message: "Role denied"});
        } 

        next();
    }   
}