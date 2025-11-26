const Model = require("../models/authModel.js");

exports.getUsers = async (req, res) => {

    try{
        const users = await Model.getUsers();
        return res.status(200).json({users});
    }catch(err) {
        return res.status(500).json({message: "Internal Server Error"});
    }
}

exports.updateRole = async (req, res) => {
    const userId = req.body.userId;
    const to_update_to = req.body.role;
    try{
        const roleId = await Model.getRoleId(to_update_to);
        const updatedRole = await Model.updateUserRole(userId,roleId);

        await Logs.addLog(req.user.userId, 
            "UPDATE_ROLE_SUCCESS", 
            req.originalUrl, 
            req.method, 
            200, 
            "Role Updated"
        );

        return res.status(200).json({message: "Success", updatedRole});
    }
    catch(err) {
        await Logs.addLog(req.user.userId, 
            "UPDATE_ROLE_FAILED", 
            req.originalUrl, 
            req.method, 
            500, 
            "Database Fail"
        );
        return res.status(500).json({message: "Internal Server Error"});
    }
}

exports.deleteUser = async (req, res) => {
    const userId = req.params.id;

    try{
        const deletedUser = await Model.deleteUser(userId);

        if(!deletedUser) {
            await Logs.addLog(req.user.userId, 
                "DELETE_USER_FAILED", 
                req.originalUrl, 
                req.method, 
                400, 
                "User Does Not Exists"
            );

            return res.status(400).json({message: "User does not exists"});
        }

        await Logs.addLog(req.user.userId, 
            "DELETE_USER_SUCCESS", 
            req.originalUrl, 
            req.method, 
            200, 
            "User Deleted"
        );

        return res.status(200).json({message: "Success", deletedUser});
    }
    catch(err) {
        await Logs.addLog(req.user.userId, 
            "DELETE_USER_FAILED", 
            req.originalUrl, 
            req.method, 
            500, 
            "Database fail"
        );
        return res.status(500).json({message: "Internal Server Error"});
    }
}