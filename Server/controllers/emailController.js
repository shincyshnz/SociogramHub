const { UsersModel } = require("../model/users");
const { generatePasswordHash } = require("../utils/bcrypt");
const { customErrorMessage } = require("../utils/customErrorMsg");
const { sendMailOTP } = require("../utils/nodemailer");

let otp, otpTimer;
const otpExpiryTime = 2 * 60 * 1000; //2 minutes in milliseconds

function generateOTP() {
    // Declare a digits variable which stores all digits
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return +OTP;
}

const sendOTP = async (req, res, next) => {
    const { email } = req.body;
    console.log(email);
    try {
        const isEmailExists = await UsersModel.findOne({ email });
        if (!isEmailExists) {
            customErrorMessage(404, "Email Doesnot exists! Create an Account.");
        }

        // Send otp to existing email 
        otp = generateOTP();
        const isMailSent = await sendMailOTP(isEmailExists.email, isEmailExists.username, otp);

        if (isMailSent) {
            otpTimer = setTimeout(() => {
                otp = 0;
                console.log('OTP has expired and is now deleted.');
            }, otpExpiryTime);

            res.status(200).json({
                email: isEmailExists.email,
                userId: isEmailExists._id,
                timer: 12000,
            })
        }
    } catch (error) {
        next(error);
    }
};

const otpVerification = (req, res, next) => {
    const { otp: otpRecieved } = req.body;
    if (otpRecieved === otp) {
        clearTimeout(otpTimer);
        res.status(200).json({
            message: "verified"
        });
    } else {
        customErrorMessage(400, "OTP has expired!")
    }
};

const resetPassword = async (req, res, next) => {
    const { userId, password } = req.body;
    try {
        const isUserExists = await UsersModel.findById({ _id: userId });
        if (!isUserExists) {
            customErrorMessage(404, "User Doesnot exists");
        }
        const hashedPassword = await generatePasswordHash(password);
        const isUpdated = await UsersModel.findByIdAndUpdate({ _id: userId }, { password: hashedPassword }, { new: true });
        if (!isUpdated) {
            customErrorMessage(400, "Password Updation Failed. Try again Later!");
        }
        res.json({
            username: isUpdated.username,
            message: "Password Updated"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    sendOTP,
    otpVerification,
    resetPassword,
};