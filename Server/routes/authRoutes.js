const express = require("express");
const { register, login } = require("../controllers/authController");
const { upload } = require("../middleware/cloudinaryUpload");
const router = express.Router();

router.post("/register",upload.single("profile_pic"), register);
router.post("/login", login);

module.exports = router;