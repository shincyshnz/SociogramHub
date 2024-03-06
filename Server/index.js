const express = require("express");
const cors = require("cors");
// const helmet = require("helmet");
const connectDb = require("./config/db");
const cookieParser = require("cookie-parser");
const errorController = require("./controllers/errorController");
const authRoutes = require("./routes/authRoutes");
const forgotPasswordRoutes = require("./routes/forgotPasswordRoutes");
const postsRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
connectDb();

// Middleware for parsing JSON data
app.use(cookieParser());
app.use(express.json());
// Middleware for parsing URL-encoded data
// app.use(express.urlencoded({ extended: true }));
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use(cors({
    origin: ["http://localhost", "http://localhost:5173"],
    credentials: true,
    cookie: {
        sameSite: "None",
        secure: true,
    }
}));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/forgotPassword', forgotPasswordRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/comments', commentRoutes);

app.use(errorController);

const PORT = process.env.PORT || 3025;
app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`);
})