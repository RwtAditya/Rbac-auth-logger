const {Router} = require("express");
const verifyToken = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");
const moderatorController = require("../controllers/moderatorController");

const moderatorRouter = Router();

moderatorRouter.get("/reports", verifyToken, requireRole("moderator"), moderatorController.reports);


module.exports = moderatorRouter;