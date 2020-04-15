const bCrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const config = require("../../config/app");
const mailer = require("../../config/nodemailer");


const timeOutVerification = (req, res) => {

    const tokenLifeStart = moment();
    const verificationToken  = req.body.token;
    const email = jwt.decode(verificationToken).email;
    const activationLink = config.activationLink + jwt.sign({ 
        email,
        tokenLifeStart
    }, config.bcryptSecretKey);

    const mailConfig = {
        from: "Best Shop In ZATK",
        to: email,
        subject: "Email confirmation",
        text: "Срок действия предыдущей ссылки истек",
        html: `<div><h2>Срок действия предыдущей ссылки истек</h2></div>
               <div>Visit this link to confirm your account: ${activationLink}
        `
    }

    mailer.sendMail(mailConfig, (err) => {
        if(err) {
            console.log("Send Email error");
            return res.status(401).json({
                status: "Error"
            });
        } else {
            console.log("Email send");
            return res.status(200).json({
            status: "Email confirmation"
            });
        }
    })
}

module.exports = {
    timeOutVerification
}