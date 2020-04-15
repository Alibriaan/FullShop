const mongoose = require('mongoose');
const bCrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = mongoose.model("User");

const signIn = (req, res) => {
    const { email , password } = req.body;
    User.findOne({email}, (err , user) => {
        if(!user) {
            return res.status(401).json({status: "Invalid user"});
        } else if(user.status === "Deactivate")  {
            return res.status(200).json({status: "Deactive account" })
        } else {
        const isValid = bCrypt.compareSync(password, user.password);
        console.log(isValid);
        if(isValid) {

            const token = jwt.sign(user.email, "SecretKey");
            // req.session.tokenValue = token;
            console.log(req.session);
            console.log(req.sessionID);
            req.session.email = user.email;
            res.json({
                status: "Success",
                id: req.sessionID
            });
        } else {
            res.status(401).json({status: "Fail" })
        }
        console.log("Konec authorizacii");
    }})
    .catch(err => res.status(500).json({message: err.message}));
}

module.exports = {
    signIn
}