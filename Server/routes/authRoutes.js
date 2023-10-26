const express = require("express");
const { register, login, handleRefreshtoken } = require("../controllers/authController");
const { upload } = require("../middleware/cloudinaryUpload");
const router = express.Router();

router.post("/register",upload.single("profile_pic"), register);
router.post("/login", login);
router.post("/refreshtoken", handleRefreshtoken);

module.exports = router;