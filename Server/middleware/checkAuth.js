const jwt = require("jsonwebtoken");
const { customErrorMessage } = require("../utils/customErrorMsg");

const checkAuth = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (!token) {
            customErrorMessage(401, "Access Denied");
        }

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft()
        }

        const verifyToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
        if (!verifyToken) {
            customErrorMessage(401, "Unauthorized Access!");
        }
        req.body.userId = verifyToken._id;
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = { checkAuth };