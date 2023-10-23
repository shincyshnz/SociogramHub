const { upload, handleUpload, runMiddleWare } = require("../middleware/cloudinaryUpload");

const register = async (req, res, next) => {
    try {
        await runMiddleWare(req, res, upload.single("profile_pic"));
        const b64 = Buffer.from(req.file?.buffer).toString("base64");
        let dataURI = "data:" + req.file?.mimetype + ";base64," + b64;
        const cldRes = await handleUpload(dataURI);
        const profile_pic = cldRes.url;
        
        console.log(cldRes);
        res.json();
    } catch (error) {
        console.log(error);
        next();
    }
};

module.exports = {
    register,
}