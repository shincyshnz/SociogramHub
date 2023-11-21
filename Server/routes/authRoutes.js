const express = require("express");
const { register, login, handleRefreshtoken, getUsers, getUserDetails } = require("../controllers/authController");
const { upload } = require("../middleware/cloudinaryUpload");
const router = express.Router();

router.post("/register",upload.single("profile_pic"), register);
router.post("/login", login);
router.post("/refreshtoken", handleRefreshtoken);
router.post("/accessToken", getUserDetails);
router.get('/searchUser', getUsers);

module.exports = router;