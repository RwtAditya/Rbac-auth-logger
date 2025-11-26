const {Router} = require("express");
const {verifyToken} = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");
const userRouter = Router();

userRouter.get("/profile", verifyToken, userController.getProfile);
userRouter.put("/update-profile", verifyToken, userController.updateProfile);


module.exports = userRouter;
