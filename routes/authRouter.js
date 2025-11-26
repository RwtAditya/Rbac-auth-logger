const {Router} = require("express");
const path = require("path");
const authController = require("../controllers/authController");

const authRouter = Router();

authRouter.post("/login", authController.loginUser);
authRouter.post("/register", authController.registerUser);


module.exports = authRouter;
