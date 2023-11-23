const jwt = require("jsonwebtoken");
const { customErrorMessage } = require("../utils/customErrorMsg");

exports.checkAuth = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (!token) {
            customErrorMessage(401, "Access Denied");
        }

        let verifyToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
        console.log(verifyToken, "==verifyAccessToken");
        if (!verifyToken) {
            customErrorMessage(401, "Unauthorized Access!");
        }

        req.body.userId = verifyToken._id;
        next();
    } catch (error) {
        if (error.message === "jwt expired") {
            customErrorMessage(401, "Unauthorized Access!");
        } else {
            next(error);

        }
    }
};
