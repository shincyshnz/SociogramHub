const { upload, handleUpload, ImageURIFormat } = require("../middleware/cloudinaryUpload");
const { UsersModel } = require("../model/users");
const { generatedPasswordHash, comparePasswordHash } = require("../utils/bcrypt");

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

        let dataURI = ImageURIFormat(req, res);
        const cldRes = await handleUpload(dataURI);
        const profilePic = cldRes.url;
        const hashedPass = await generatedPasswordHash("password", SALT);
        const newUser = await UsersModel.create({ username, email, password: hashedPass, profilePic, bio, gender, dob });
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

const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await UsersModel.findOne({ email });
        if(!user){
            return res.status(404).json({ message: "User doesnot exists.!" });
        }

        const validPassword = comparePasswordHash(password, user.password);
        if(!validPassword){
            return res.status(404).json({ message: "Username/Paswword is not valid!" });
        }

        res.json({ _id: user._id, email: user.email, username : user.username});
    } catch (error) {
        next(error);
    }
};


module.exports = {
    register,
    login,
}