const { upload, handleUpload, ImageURIFormat } = require("../middleware/cloudinaryUpload");
const { UsersModel } = require("../model/users");
const { generatedPasswordHash, comparePasswordHash } = require("../utils/bcrypt");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");

const register = async (req, res, next) => {
    const { username, email, password, bio, dob, gender } = req.body;

    try {
        // Handling Userdata
        const isExists = await UsersModel.findOne({ email });
        if (isExists) {
            throw new Error("Email already exists.");
        }

        const isExistsUsername = await UsersModel.findOne({ username });
        if (isExistsUsername) {
            throw new Error("Username already exists.");
        }

        let dataURI = ImageURIFormat(req, res);
        const cldRes = await handleUpload(dataURI);
        const profilePic = cldRes.url;
        const hashedPass = await generatedPasswordHash("password");
        const newUser = await UsersModel.create({ username, email, password: hashedPass, profilePic, bio, gender, dob });
        if (newUser) {
            res.json({
                result: newUser
            });
        }
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await UsersModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User doesnot exists.!" });
        }

        const validPassword = comparePasswordHash(password, user.password);
        if (!validPassword) {
            return res.status(404).json({ message: "Username/Paswword is not valid!" });
        }

        // Generate Access Token and Refresh Token
        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        res.cookie("refresh-token", refreshToken, {
            httpOnly: true,
            secure: true,
        })

        res.json({ _id: user._id, email: user.email, username: user.username });
    } catch (error) {
        next(error);
    }
};


module.exports = {
    register,
    login,
}