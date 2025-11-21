const express = require("express");
const dotenv = require("dotenv");


const app = express();
dotenv.config();

app.use(express.json());

app.get("/health", (req, res) => {
    res.send("Hello");
})

PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
    if(err) {
        throw err;
    }
    console.log(`The server is running at ${PORT}`);
})