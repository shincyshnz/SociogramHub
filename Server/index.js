const express = require("express");
const cors = require("cors");
// const helmet = require("helmet");
const connectDb = require("./config/db");
const errorController = require("./controllers/errorController");
const authRoutes = require("./routes/authRoutes");
const forgotPasswordRoutes = require("./routes/forgotPasswordRoutes");
const cookieParser = require("cookie-parser");

const app = express();
connectDb();

// Middleware for parsing JSON data
app.use(express.json());
// Middleware for parsing URL-encoded data
// app.use(express.urlencoded({ extended: true }));
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors({
    origin: ["http://localhost","http://localhost:5173"],
    credentials: true,
    cookie:{
        sameSite : "none",
        secure:true,
    }
}));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/forgotPassword', forgotPasswordRoutes);


app.use(errorController);

const PORT = process.env.PORT || 3025;
app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`);
})