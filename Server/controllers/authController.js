const { upload, handleUpload, runMiddleWare, ImageURIFormat } = require("../middleware/cloudinaryUpload");
const { UsersModel } = require("../model/users");
const { generatedPasswordHash } = require("../utils/bcrypt");

const SALT = 10;

const register = async (req, res, next) => {
    const { username, email, password, bio, dob, gender } = req.body;
    console.log(req.body);
    try {
        // Handling Userdata
        const isExists = await UsersModel.findOne({ email });
        if (isExists) {
            return res.status(404).json({ message: "User already exists" });
        }

        // Uploading profile pic to cloudinary
        await runMiddleWare(req, res, upload.single("profile_pic"));
        let dataURI = ImageURIFormat(req, res);
        const cldRes = await handleUpload(dataURI);
        const profilePic = cldRes.url;

        const hashedPass = await generatedPasswordHash("password", SALT);
        const newUser = await UsersModel.create({ username, email, password: hashedPass, profilePic, bio, gender });
        if (newUser) {
            res.json({
                result: newUser
            });
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports = {
    register,
}