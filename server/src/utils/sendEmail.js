const asyncHandler = require('express-async-handler')
const nodemailer = require("nodemailer");

const sendEmail = asyncHandler(async ({email, html}) => {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "takistechcommunity@gmail.com",
            pass: "doxhgymwnlkxmczj",
        },
    });



    const info = await transporter.sendMail({
        from: 'Ecommerce  "<no-reply@ecommmerce.com>', // sender address
        to: email, // list of receivers
        subject: "Forgot password", // Subject line
        html: html, // html body
    });

    return info
})

module.exports = sendEmail;