const express = require("express");
const { sendOTP, otpVerification, resetPassword } = require("../controllers/emailController");
const router = express.Router();

router.post("/otp", sendOTP);
router.post("/verifyOtp", otpVerification);
router.post("/resetPassword", resetPassword);

module.exports = router;

