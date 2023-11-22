const express = require("express");
const { register, login, handleRefreshtoken, getUsers, getUserDetails } = require("../controllers/authController");
const { upload } = require("../middleware/cloudinaryUpload");
const { checkAuth } = require("../middleware/checkAuth");
const router = express.Router();

router.post("/register",upload.single("profile_pic"), register);
router.post("/login", login);
router.get("/refreshToken", handleRefreshtoken);
router.get("/getUserDetails", checkAuth, getUserDetails);
router.get('/searchUser', getUsers);

module.exports = router;