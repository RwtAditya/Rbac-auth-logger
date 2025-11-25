const { Router } = require("express");
const adminController = require("../controllers/adminController");
const verifyToken = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");

const adminRouter = Router();


adminRouter.get("/all-users",verifyToken, requireRole("admin"), adminController.getUsers);
adminRouter.put("/update-role", verifyToken, requireRole("admin"), adminController.updateRole);
adminRouter.delete("/delete-user", verifyToken, requireRole("admin"), adminController.deleteUser);


module.exports = adminRouter;