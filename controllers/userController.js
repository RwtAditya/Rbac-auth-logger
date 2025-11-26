const Model = require("../models/authModel");
const Logs = require("../models/logsModel");

exports.getProfile = async (req, res) => {
    const email = req.user.email;

    try{
        const profile = await Model.findByEmail(email);

        return res.status(200).json({profile: profile});
    }
    catch(err) {
        return res.status(500).json({message: "Internal Server Error"});
    }
}

exports.updateProfile = async (req, res) => {
    const userId = req.user.userId;
    const {name} = req.body;

    try{
        const updatedProfile = await Model.updateProfile(userId, name);
        await Logs.addLog(userId, 
                    "PROFILE_UPDATE_SUCCESSFULL", 
                    req.originalUrl, 
                    req.method, 
                    200, 
                    "Profile Updated"
                );
        return res.status(200).json({profile: updatedProfile});
    }
    catch(err){
        await Logs.addLog(userId, 
                    "PROFILE_UPDATE_FAILED", 
                    req.originalUrl, 
                    req.method, 
                    500, 
                    "Database Fail"
                );
        return res.status(500).json({message: "Internal Server Error"});
    }
}


