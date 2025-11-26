const {Router} = require("express");
const Moderator = require("../models/authModel"); 

exports.reports = async (req, res) => {
    try {
        const reports = await Moderator.getAllReports();
        return res.status(200).json({reports: reports});
    } catch (err) {
        console.error("Error fetching reports", err.stack);
        return res.status(500).json({message: "Internal Server Error"});
    }
};