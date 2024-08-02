const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: "sienokanton0@gmail.com",
        pass: "phcn olfr agop wdpr",
    },
});


const mailData = {
    from: 'sienokanton0@gmail.com',  // sender address
    to: 'antonshienok08@gmail.com',   // list of receivers
    subject: 'Ohaujshfkasbf aksjdf askjf hasljkfhc asl nadsgljf aksdljfhaskjhf asfhjaskljf ash k,asnckjuasbhn c,amxcbnaskhjj cbaXZ,mncbasikdhcb asvmj,cjadsbcvkahjsd basdkjfbnas kdf',
    text: 'BKHJbdaskhfbcasmn asmnf basmknc bnasdjkf nasdcvkjasnb dax,mnc askjcaxz,cmnasx kcjasd cwqkljscnasl;kc adskljocmw asc  asdlc asdc asdclkasd csadkfvmds vdsovk dsfkjv swdlkv sdvwe daslvcsdjv sdvlokbasnd vcasokldjc asei fasdicuj hasbckja sfcnjsaduvjja sncjsiuxfvhjaosn cvjbandslknfadksjlbvfsikdhjklKA'
};

transporter.sendMail(mailData, (err, info) => {
    if (err) {
        console.log(err)
    } else {
        console.log(info)
    }
})