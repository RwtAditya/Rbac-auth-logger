const pool = require("../db/db");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/authModel");
const Logs = require("../models/logsModel");


exports.loginUser = async (req, res) => {
    const {email, password} = req.body;

    try{    
        const user = await User.findByEmail(email);

        if(!user) {
            await Logs.addLog(null, 
                "LOGIN_FAILED", 
                req.originalUrl, 
                req.method, 
                401, 
                "User Not Found"
            );

            return res.status(401).json({message: "User does not exist"});
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);

        if(!isMatch) {
            await Logs.addLog(user.id, 
                "LOGIN_FAILED", 
                req.originalUrl, 
                req.method, 
                401, 
                "INCORRECT PASSWORD"
            );
            
            return res.status(401).json({message: "Invalid Email or Password"});
        }

        const roleId = await User.getUserRoleId(user.id);
        const roleName = await User.getRoleName(roleId.role_id);

        const token = jwt.sign(
            {userId:user.id, email:user.email, role: roleName.name},
            process.env.SECRET_KEY,
            {expiresIn: "1h"}
        )

        await Logs.addLog(user.id, 
            "LOGIN_SUCCESS", 
            req.originalUrl, 
            req.method, 
            200, 
            "USER LOGGED IN"
        );
        
        return res.status(200).json({message:"Success", token:token});
    }
    catch (err){
        await Logs.addLog(null, 
            "LOGIN_FAILED", 
            req.originalUrl, 
            req.method, 
            500, 
            "Database Fail"
        );
        console.error("Error Logging In", err.stack);
        return res.status(500).json({message:"Internal Server Error"});
    }
}

exports.registerUser = async (req, res) => {
    const {name, email, password} = req.body;

    try{
        
        //check if user already exists
        const check = await User.findByEmail(email);
        if(check){
            await Logs.addLog(null, 
                "REGISTRATION_FAILED", 
                req.originalUrl, 
                req.method, 
                409, 
                "User Already Exists"
            );

            return res.status(409).json({message: "User already exists"});
        }
        const password_hash = await bcrypt.hash(password, 10);

        const user = await User.registerUser(name, email, password_hash);

        const role = await User.getRoleId("user");

        await User.asignUserRole(user.id, role.id);

        await Logs.addLog(user.id,
            "REGISTRATION_SUCCESS", 
            req.originalUrl, req.method, 
            200, 
            "User Registration Successful"
        );

        return res.status(200).json({message: "Success"});

    }catch(err) {
        console.error("Error creating user", err.stack);
        await Logs.addLog(null, 
            "REGISTRATION_FAILED", 
            req.originalUrl, 
            req.method, 
            500, 
            "Database Fail"
        );

        return res.status(500).json({message: "Internal Server Error"});
    }
}