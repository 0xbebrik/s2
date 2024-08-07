const nodemailer = require("nodemailer");
const fs = require('fs');
const { promisify } = require('util');
const {join} = require("node:path");
const readFileAsync = promisify(fs.readFile);

const transporter = nodemailer.createTransport({
    service: "yandex",
    auth: {
        user: "antonshienok@yandex.ru",
        pass: "kbcjkpmacuqzqhyv",
    },
});

myMail = "antonshienok@yandex.ru"


async function main() {
    const info = await transporter.sendMail({
        from: 'support@sovagg.net', // sender address
        to: "antonshienok08@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
    });
    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

async function sendForget(to, token) {
    fs.readFile(join(__dirname, '/htmlTemplates/forget.html'), 'utf8', (err, data) => {
        if (err) {
            return console.log(err);
        }

        let htmlContent = data.replace('{{link}}', token);

        let mailOptions = {
            from: 'antonshienok@yandex.ru',
            to: to,
            subject: 'Восстановление пароля',
            html: htmlContent
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
        });
    });

}

module.exports = {
    sendForget
}