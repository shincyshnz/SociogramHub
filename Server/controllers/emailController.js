const { UsersModel } = require("../model/users");
const { customErrorMessage } = require("../utils/customErrorMsg");
const { sendMailOTP } = require("../utils/nodemailer");

const sendOTP = async (req, res, next) => {
    const { email } = req.body;
    console.log(email);
    try {
        const isEmailExists = await UsersModel.findOne({ email });
        if(!isEmailExists){
            customErrorMessage(404, "Email Doesnot exists! Create an Account.");
        }

        // Send otp to existing email 
        otp = await sendMailOTP(isEmailExists.email, isEmailExists.username);

        if (otp) {
            expireOtp = setTimeout(() => {
                otp = 0;
            }, 120000); //120000ms == 2minutes

            res.status(200).json({
                email: isEmailExists.email,
                userId: isEmailExists._id,
            })
        }
    } catch (error) {
        next(error);
    }
};

module.exports = { sendOTP };