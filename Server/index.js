const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const connectDb = require("./config/db");
const Multer = require("multer");
const { handleUpload } = require("./config/cloudinary");
const errorController = require("./controllers/errorController");
const authRoutes = require("./routes/authRoutes");

const app = express();
connectDb();

// Middleware for parsing JSON data
app.use(express.json());
// Middleware for parsing URL-encoded data
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors({
    origin: ["*", "http://localhost"],
    credentials: true,
}));

app.use('/api/auth', authRoutes);

app.use(errorController);

const PORT = process.env.PORT || 3025;
app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`);
})