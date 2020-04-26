//const bCrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const config = require("../../config/app");
const mailer = require("../../config/nodemailer");

const ERR_MAIL_DOESNT_SEND = "ERR_MAIL_DOESNT_SEND";
const EMAIL_SUCCESS = "EMAIL_SUCCESS";

const timeOutVerification = (req, res) => {
    const tokenLifeStart = moment();
    const email = jwt.decode(req.body.token).email;
    const activationLink = config.activationLink + jwt.sign({ 
        email,
        tokenLifeStart
    }, config.bcryptSecretKey);
    const mailConfig = initEmailList(email, activationLink);
    sendList(mailConfig);
}

function initEmailList(email, activationLink) {
    return {
        from: "Best Shop In ZATK",
        to: email,
        subject: "Email confirmation",
        text: "Срок действия предыдущей ссылки истек",
        html: `<div><h2>Срок действия предыдущей ссылки истек</h2></div>
               <div>Visit this link to confirm your account: ${activationLink}
        `
    }
}

function sendList(mailConfig) {
    mailer.sendMail(mailConfig, (err) => {
        if(err) {
            console.log(ERR_MAIL_DOESNT_SEND);
            return res.status(401).json({
                status: ERR_MAIL_DOESNT_SEND
            });
        } else {
            console.log(EMAIL_SUCCESS);
            return res.status(200).json({
            status: EMAIL_SUCCESS
            });
        }
    })
}


module.exports = {
    timeOutVerification
}