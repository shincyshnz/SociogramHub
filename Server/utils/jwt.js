const jwt = require("jsonwebtoken");

const generateAccessToken = (userId) => {
    return jwt.sign(
        { _id: userId },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: '1d' }
    );
};

const generateRefreshToken = (userId) => {
    return jwt.sign({ _id: userId }, process.env.REFRESH_TOKEN_SECRET_KEY);
};

const verifyRefreshToken = (refreshToken) => {
    const validToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY);
    if (!validToken) return false;  
    return validToken._id;
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
}