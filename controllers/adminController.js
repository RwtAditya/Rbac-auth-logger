const Model = require("../models/authModel");


exports.getUsers = async (req, res) => {
    const userId = req.user.userId;

    try{
        const users = await Model.getUsers();
        return res.status(200).json({users});
    }catch(err) {
        return res.status(500).json({message: "Internal Server Error"});
    }
}

exports.updateRole = async (req, res) => {
    const userId = req.user.userId;
    const to_update_to = req.body.role;
    try{
        const roleId = await Model.getUserRoleId(to_update_to);
        const updatedRole = await Model.updateUserRole(userId,roleId);
        return res.status(200).json({message: "Success", updatedRole});
    }
    catch(err) {
        return res.status(200).json({message: "Internal Server Error"});
    }
}

exports.deleteUser = async (req, res) => {
    const userId = req.user.userId;

    try{
        const deletedUser = await Model.deleteUser(userId);

        if(!deletedUser) {
            return res.status(400).json({message: "User does not exists"});
        }

        return res.status(200).json({message: "Success", deletedUser});
    }
    catch(err) {
        return res.status(500).json({message: "Internal Server Error"});
    }
}