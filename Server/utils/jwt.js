const jwt = require("jsonwebtoken");

const generateAccessToken = (userId) => {
    return jwt.sign({ _id: userId }, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: '1d' });
};

const verifyAccessToken = (token) =>{
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
}

const generateRefreshToken = (userId) => {
    return jwt.sign({ _id: userId }, process.env.REFRESH_TOKEN_SECRET_KEY, { expiresIn: "1y" });

};

const verifyRefreshToken = (refreshToken) => {
    if (!refreshToken) return false;
    const validToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY);
    if (!validToken) return false;
    return validToken._id;
};

module.exports = {
    generateAccessToken,
    verifyAccessToken,
    generateRefreshToken,
    verifyRefreshToken
}