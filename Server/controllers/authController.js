const { handleUpload, ImageURIFormat } = require("../middleware/cloudinaryUpload");
const { UsersModel } = require("../model/users");
const { generatePasswordHash, comparePasswordHash } = require("../utils/bcrypt");
const { customErrorMessage } = require("../utils/customErrorMsg");
const { generateAccessToken, generateRefreshToken, verifyRefreshToken, verifyAccessToken } = require("../utils/jwt");

const register = async (req, res, next) => {
    const { fullname, username, email, password, bio, dob, gender } = req.body;

    try {
        let profilePic = "";
        // Handling Userdata
        const isExists = await UsersModel.findOne({ email });
        if (isExists) {
            return customErrorMessage(400, "Email already exists.");
        }

        const isExistsUsername = await UsersModel.findOne({ username });
        if (isExistsUsername) {
            customErrorMessage(400, "Username already exists.");
        }
        if (req.file) {
            let dataURI = ImageURIFormat(req, res);
            const cldRes = await handleUpload(dataURI);
            profilePic = cldRes.url;
        }

        const hashedPass = await generatePasswordHash(password);
        const newUser = await UsersModel.create({ fullname, username, email, password: hashedPass, profilePic, bio, gender, dob });
        if (newUser) {
            res.status(200).json({
                result: newUser
            });
        }
    } catch (error) {
        next(error);
    }
};

const generateTokens = (res, userId) => {
    const accessToken = generateAccessToken(userId);
    const refreshToken = generateRefreshToken(userId);

    return [accessToken, refreshToken];
}

const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await UsersModel.findOne({ email });
        const { password: userPassword, ...userDetails } = user._doc;
        if (!user) {
            customErrorMessage(404, "User doesnot exists.!");
        }

        const validPassword = await comparePasswordHash(password, userPassword);

        if (!validPassword) {
            customErrorMessage(404, "Username/Password is not valid!");
        }

        // Generate Access Token and Refresh Token
        const [accessToken, refreshToken] = generateTokens(res, user._id);

        res.status(200).cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
        }).json({ user: userDetails, accessToken });
    } catch (error) {
        next(error);
    }
};

const handleRefreshtoken = (req, res, next) => {
    try {
        // console.log(req.cookies.refreshToken, "==refreshToken");
        // console.log(req.cookies.refreshToken);
        if (!req.cookies.refreshToken) {
            customErrorMessage(400, "Refresh token not found in the cookie.");
        }

        const userId = verifyRefreshToken(req.cookies.refreshToken);
        if (!userId) {
            customErrorMessage(401, "Refresh token has expired. Login to Continue");
        }

        const [accessToken] = generateTokens(res, userId);
        res.status(200).json({ accessToken });

    } catch (error) {
        next(error);
    }
};

const getLoggedInUser = async (req, res, next) => {
    try {
        const { userId } = req.body;
        const userDetails = await UsersModel.findById({ _id: userId }).select("-password");
        res.status(200).json({ userDetails });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    register,
    login,
    handleRefreshtoken,
    getLoggedInUser,
}