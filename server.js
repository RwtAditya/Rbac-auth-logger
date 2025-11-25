const express = require("express");
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const adminRouter = require("./routes/adminRouter");
const moderatorRouter = require("./routes/moderatorRouter");
const logsRouter = require("./routes/logsRouter");
const dotenv = require("dotenv");


const app = express();
dotenv.config();

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/moderator", moderatorRouter);
app.use("/api/user", userRouter);
app.use("/api/logs", logsRouter);


PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
    if(err) {
        throw err;
    }
    console.log(`The server is running at ${PORT}`);
})