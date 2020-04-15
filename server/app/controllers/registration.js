const mongoose = require("mongoose");
const bCrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const config = require("../../config/app");
const mailer = require("../../config/nodemailer");
const User = mongoose.model("User");

// добавить регулярку на фронт запрет русских символов....

const signUp = (req, res) => {
    console.log("Regisration controler start");
    const {email , password} = req.body;

    new User({
        email: email,
        password: bCrypt.hashSync(password, 10),
        status: "Deactivate",
        basket: [],
    }).save( err => {
        if(err.code === 11000) {
            return res.status(400).json({
                status: "Duplicate",
            });
        } else if(err) {
            return res.status(400).json({
                status: "Fail",
            }); 
        } else {
        const tokenLifeStart = moment();
        const activationLink = config.activationLink + jwt.sign({ 
            email,
            tokenLifeStart
        }, config.bcryptSecretKey);

        const mailConfig = {
            from: "Best Shop In ZATK",
            to: email,
            subject: "Email confirmation",
            text: "Please confirm your email",
            html: `<div><h2>Hello</h2></div>
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
                return res.json({
                status: "Email confirmation"
                });
            }
        })
    }})
}

module.exports =  { 
    signUp
}


