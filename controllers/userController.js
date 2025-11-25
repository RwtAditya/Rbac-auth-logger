const Model = require("../models/authModel");

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

        return res.status(200).json({profile: updatedProfile});
    }catch(err){
        return res.status(500).json({message: "Internal Server Error"});
    }
}


