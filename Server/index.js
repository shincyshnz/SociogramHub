const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const connectDb = require("./config/db");
const Multer = require("multer");
const { handleUpload } = require("./config/cloudinary");

const app = express();
connectDb();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors({
    origin: ["*", "http://localhost"],
    credentials: true,
}));

const storage = new Multer.memoryStorage();
const upload = Multer({
    storage,
});

app.get("/", (req, res) => {
    res.json("Success");
});

app.post("/upload", upload.single("my_file"), async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const cldRes = await handleUpload(dataURI);
        //   res.json(cldRes);
        console.log(cldRes);
        res.json();
    } catch (error) {
        console.log(error);
        res.send({
            message: error.message,
        });
    }
});

app.use(errorController);

const PORT = process.env.PORT || 3025;
app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`);
})