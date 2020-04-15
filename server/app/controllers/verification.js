const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const config = require("../../config/app");
const User = mongoose.model("User");

const moment = require("moment");

const confirmationAccount = (req, res) => {
    
    const tokenEndLifeTime = moment();
    const verificationToken  = req.body.token;
    const tokenBody = jwt.decode(verificationToken);
    console.log(tokenBody);
    const minuteDuration = tokenEndLifeTime.diff(moment(tokenBody.tokenLifeStart), "minutes");
    const verificationEmail = tokenBody.email;
    console.log(verificationEmail);
        User.findOne({email: verificationEmail}, (err , user) => {
            console.log("Search");
            if(!user || err) {
                return res.status(401).json({status: "Fail"});
            } else if(minuteDuration > 5 && user.status === "Deactivate") {
                console.log("Время жизни токена истекло");
                return res.send({status: "Token timeout"});
            } else if(user.email === verificationEmail && user.status === "Deactivate"){
                User.updateOne({email: verificationEmail}, {status: "Active"}, (err) => {
                    if(err) {
                        console.log1("Update Error");
                        return res.status(401).json({status: "Account status update error"});
                    } else {
                        console.log("Success Update");
                        return res.send({status: "Success confirmation"});
                    }
                });
            } else if(user.email === verificationEmail && user.status === "Active") {
                return res.send({status: "Active user"});
            } else {
                return res.status(401).json({status: "User doesnt found"});
            }
        })
        .catch(err => res.status(500).json({message: err.message}));
}

module.exports = {
    confirmationAccount
}