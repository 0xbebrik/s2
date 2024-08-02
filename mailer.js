const nodemailer = require("nodemailer");

module.exports = async function (mailOptions) {
    const transporter = nodemailer.createTransport({
        host: "smtp.yandex.ru",
        port: 465,
        secure: true,
        auth: {
            user: "kamkfjanslkjvn",
            pass: "rgltpndtyatzzxey",
        },
    });
    await transporter.sendMail(mailOptions);
}