const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "sovagg.net",
    port: 25,
    auth: {
        user: "support@sovagg.net",
        pass: "0[2(wei0%i*h=YA[",
    },
});
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

main().catch(console.error);