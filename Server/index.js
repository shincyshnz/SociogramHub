import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());


const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`Server Connected : ${PORT}`);
})