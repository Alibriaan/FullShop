const mongoose = require("mongoose");
const bCrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const config = require("../../config/app");
const mailer = require("../../config/nodemailer");
const User = mongoose.model("User");

const ERR_USER_EXSIST = 11000;

const signUp = (req, res) => {
    console.log("Regisration controler start");
    const {email , password} = req.body;
    new User({
        email: email,
        password: bCrypt.hashSync(password, 10),
        status: "Deactivate",
        basket: [],
    }).save( err => {
        if(isError(err)) {
            errorHandler(err, res);
        } else {
            const tokenLifeStart = moment();
            const activationLink = config.activationLink + jwt.sign({ 
                email,
                tokenLifeStart
            }, config.bcryptSecretKey);
            const mailConfig = initEmailList(email, activationLink);
            sendList(mailConfig, res);
        }
    })
}

function isError(err) {
    return err;
}

function errorHandler( {code}, res ) {
    switch(code) {
        case(ERR_USER_EXSIST): {
            return res.status(400).json({
                status: "Duplicate",
            });
        }
        default: {
            return res.status(400).json({
                status: "Fail",
            });
        }
    }
}

function initEmailList(email, activationLink) {
    return {
        from: "Best Shop In ZATK",
        to: email,
        subject: "Email confirmation",
        text: "Please confirm your email",
        html: `<div><h2>Hello</h2></div>
               <div>Visit this link to confirm your account: ${activationLink}
              `
    }
}

function sendList(mailConfig, res) { 
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
    });
}

module.exports =  { 
    signUp
}


