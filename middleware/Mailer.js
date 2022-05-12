const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.HOSTMAIL,
    port: process.env.PORTMAIL,
    auth: {
        user: process.env.USER_MAIL,
        pass: process.env.USER_PASS
    },
    tls: {
        ciphers: 'SSLv3'
    }
})

module.exports = transporter;