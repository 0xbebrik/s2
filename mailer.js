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

statuses = {
    0: {statusText: "Предварительный"},
    1: {statusText: "Ожидание оплаты"},
    2: {statusText: "Ожидание перевода"},
    3: {statusText: "Завершено"},
    4: {statusText: "Ошибка"}
}


async function sendForget(to, token) {
    fs.readFile(join(__dirname, '/htmlTemplates/forget.html'), 'utf8', (err, data) => {
        if (err) {
            return console.log(err);
        }

        let htmlContent = data.replace('{{link}}', token);

        let mailOptions = {
            from: myMail,
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

async function sendStep(to, step, ticket, user, fromCurrency, toCurrency, course) {
    fs.readFile(join(__dirname, '/htmlTemplates/step.html'), 'utf8', (err, data) => {
        if (err) {
            return console.log(err);
        }

        let htmlContent = data.replace('{{email}}', user.email);
        htmlContent = htmlContent.replace('{{ticketId}}', ticket.id || "0");
        htmlContent = htmlContent.replace('{{ticketId}}', ticket.id || "0");
        htmlContent = htmlContent.replace('{{statusText}}', statuses[step.toString()].statusText);
        htmlContent = htmlContent.replace('{{toRequesitesList}}', "");
        htmlContent = htmlContent.replace('{{fromCurrency}}', fromCurrency.FullName);
        htmlContent = htmlContent.replace('{{toCurrency}}', toCurrency.FullName);
        htmlContent = htmlContent.replace('{{fromAmount}} ', ticket.from_Value);
        htmlContent = htmlContent.replace('{{fromCurrencyText}}', fromCurrency.currency);
        htmlContent = htmlContent.replace('{{toAmount}}', ticket.to_Value);
        htmlContent = htmlContent.replace('{{toCurrencyText}}', toCurrency.currency);
        htmlContent = htmlContent.replace('{{course}}', course);
        const date = new Date();
        const options = { month: 'long' };
        const monthName = date.toLocaleString('ru-RU', options);
        htmlContent = htmlContent.replace('{{date}}', `${new Date().getDay()} ${monthName} ${new Date().getFullYear()} г ${new Date().getHours()}:${new Date().getMinutes()}`);
        htmlContent = htmlContent.replace('{{wallet}}', ticket.wallet);

        let elemString = fromCurrency.input.split(";").map((item, index) => {
            return `<tr><td>${item.replace("$direction", "отправителя")}:</td><td>${ticket.FIO.split(";")[index]}</td></tr>`;
        }).join('');



        htmlContent = htmlContent.replace('{{fromRequesitesList}}', elemString);

        let eelemString = toCurrency.input.split(";").map((item, index) => {
            console.log(item)
            return `<tr><td>${item.replace("$direction", "получателя")}:</td><td>${ticket.cardNumber.split(";")[index]}</td></tr>`;
        }).join('');
        htmlContent = htmlContent.replace('{{asgfasdfasf}}', eelemString);

        htmlContent = htmlContent.replace('{{link}}', "https://sovagg.net/claim/?id=" + ticket.id);

        let mailOptions = {
            from: myMail,
            to: to,
            subject: 'Ваша заявка',
            html: htmlContent
        };


        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
        });

    })
}

module.exports = {
    sendForget,
    sendStep
}