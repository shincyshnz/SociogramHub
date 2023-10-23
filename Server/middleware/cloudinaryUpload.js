const cloudinary = require("cloudinary").v2;
const Multer = require("multer");

const ImageURIFormat = (req, res) => {
    const b64 = Buffer.from(req.file?.buffer).toString("base64");
    let dataURI = "data:" + req.file?.mimetype + ";base64," + b64;
    return dataURI;
}

const handleUpload = async (file) => {
    const res = await cloudinary.uploader.upload(file, {
        resource_type: "auto",
    });
    return res;
}

const runMiddleWare = (req, res, fn) => {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
}

const storage = new Multer.memoryStorage();

const upload = Multer({
    storage,
});

module.exports = {
    runMiddleWare,
    ImageURIFormat,
    handleUpload,
    upload,
}