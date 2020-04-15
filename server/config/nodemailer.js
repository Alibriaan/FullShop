const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport( 
    {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: "practic.task.nodemailer@gmail.com",
            pass: "Suohmikoto"
        }
    },
    {
        from: "Mailer Test <practic.task.nodemailer@gmail.com>"
    }
);

module.exports = transporter;