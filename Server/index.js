import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import { connectDb } from "./config/db.js";

dotenv.config();
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