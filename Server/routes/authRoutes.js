const express = require("express");
const router = express.Router();

const { register,
    login,
    handleRefreshtoken,
    getLoggedInUser,
} = require("../controllers/authController");
const { upload } = require("../middleware/cloudinaryUpload");
const { checkAuth } = require("../middleware/checkAuth");

router.post("/register", upload.single("profile_pic"), register);
router.post("/login", login);
router.get("/refreshToken", handleRefreshtoken);
router.get("/profile", checkAuth, getLoggedInUser);

module.exports = router;