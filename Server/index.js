const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors").config();
const dotenv = require("dotenv");
const helmet = require("helmet");
const { connectDb } = "./config/db.js";

const app = express();
connectDb();

app.use(express.json({ limit :"30mb", extended : true}));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors({
    origin : ["http://localhost"],
    credentials:true,
}));




const PORT = process.env.PORT || 3025;
app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`);
})