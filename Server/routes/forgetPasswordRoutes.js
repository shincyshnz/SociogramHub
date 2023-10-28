const express = require("express");
const { sendOTP, otpVerification } = require("../controllers/emailController");
const router = express.Router();

router.post("/otp", sendOTP);
router.post("/verifyOtp", otpVerification);

module.exports = router;