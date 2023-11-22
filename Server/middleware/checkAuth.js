const jwt = require("jsonwebtoken");
const { customErrorMessage } = require("../utils/customErrorMsg");

const checkAuth = (req, res, next) => {
    try {
        let token = req.headers.accesstoken;
        if (!token) {
            customErrorMessage(401, "Access Denied");
        }
        console.log(token, "==token");

        const verifyToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, function (err) {
            customErrorMessage(401, "Unauthorized Access!");
        });
        // console.log(verifyToken,"==verifyToken");
        // if (!verifyToken) {
        //     customErrorMessage(401, "Unauthorized Access!");
        // }
        req.body.userId = verifyToken._id;
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = { checkAuth };