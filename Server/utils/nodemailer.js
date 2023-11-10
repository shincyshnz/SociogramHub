const nodemailer = require("nodemailer");

const sendMailOTP = async (userEmail, userName, otp) => {
    try {
        // connect with the smtp
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            auth: {
                user: "testhostsite123@gmail.com",
                pass: "urzskschkroezgml",
            },
        });
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"SociogramHub App" <testhostsite123@gmail.com>', // sender address
            to: `"${userEmail}"`, // list of receivers
            subject: "Password Reset Verification Code", // Subject line
            text: `${otp}`, // plain text body
            html: `<b>Hi ${userName},</b>
            <p>We are sending you this email because you requested a password reset. Use the below otp to reset password.</p>
            <p><h1>${otp}</h1></p>`, // html body
        });
        return true;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    sendMailOTP,
};