const { UsersModel } = require("../model/users");
const { customErrorMessage } = require("../utils/customErrorMsg");
const { sendMailOTP } = require("../utils/nodemailer");

let expireOtp;
function generateOTP() {
    // Declare a digits variable which stores all digits
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

const sendOTP = async (req, res, next) => {
    const { email } = req.body;
    try {
        const isEmailExists = await UsersModel.findOne({ email });
        if (!isEmailExists) {
            customErrorMessage(404, "Email Doesnot exists! Create an Account.");
        }

        // Send otp to existing email 
        const otp = generateOTP();
        const isMailSent = await sendMailOTP(isEmailExists.email, isEmailExists.username, otp);

        if (isMailSent) {
            expireOtp = setTimeout(() => {
                otp = 0;
            }, 120000); //120000ms == 2minutes

            res.status(200).json({
                email: isEmailExists.email,
                userId: isEmailExists._id,
                timer:12000,
            })
        }
    } catch (error) {
        next(error);
    }
};

module.exports = { sendOTP };