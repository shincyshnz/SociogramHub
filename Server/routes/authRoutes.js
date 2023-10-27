const express = require("express");
const { register, login, handleRefreshtoken, getUsers } = require("../controllers/authController");
const { upload } = require("../middleware/cloudinaryUpload");
const router = express.Router();

router.post("/register",upload.single("profile_pic"), register);
router.post("/login", login);
router.post("/refreshtoken", handleRefreshtoken);
router.get("/",getUsers);

module.exports = router;