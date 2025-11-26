const {Router} = require('express');
const {verifyToken} = require("../middleware/authMiddleware");
const {requireRole} = require("../middleware/roleMiddleware");
const logsController = require("../controllers/logsController");
const logRouter = Router();

logRouter.get("/get-logs", verifyToken, requireRole("admin"), logsController.getLogs);
logRouter.get("/filter-logs", verifyToken, requireRole("admin"), logsController.filterLogs);

module.exports = logRouter;