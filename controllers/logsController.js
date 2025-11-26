const Logs = require("../models/logsModel.js");

exports.getLogs = async (req, res) => {
    try {
        const logs = await Logs.fetchAllLogs();
        return res.status(200).json({logs: logs});
    } catch (err) {
        console.error("Error fetching logs", err.stack);
        return res.status(500).json({message: "Internal Server Error"});
    }   
};

exports.filterLogs = async (req, res) => {
    const userId = req.user.userId;

    try{
        const logs = await Logs.filterLogs(userId);

        return res.status(200).json({message: "Success", logs:logs});
    }
    catch(err) {
        console.error("Error fetching logs", err.stack);
        return res.status(500).json({message: "Internal Serer Error"});
    }

}