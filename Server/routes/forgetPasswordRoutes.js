const express = require("express");
const { sendOTP } = require("../controllers/emailController");
const router = express.Router();

router.post("/otp", sendOTP);

module.exports = router;