const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "mail.sovagg.net",
    port: 25,
    secure: false,
    auth: {
        user: "support@sovagg.net",
        pass: "rWqK9p[-5U?vhK@I",
    },
});
async function main() {
    const info = await transporter.sendMail({
        from: '"Maddison Foo Koch 👻" <support@sovagg.net>', // sender address
        to: "antonshienok08@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });
    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

main().catch(console.error);