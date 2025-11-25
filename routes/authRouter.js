const {Router} = require("express");
const path = require("path");
const authController = require("../controllers/authController");

const authRouter = Router();

userRouter.post("/login", authController.loginUser);
userRouter.post("/register", authController.registerUser);


module.exports = authRouter;
