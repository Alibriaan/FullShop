const mongoose = require('mongoose');
const bCrypt = require("bcrypt");
const User = mongoose.model("User");

const ERR_USER_DOESNT_EXSIST = "ERR_USER_DOESNT_EXSIST";
const ERR_INVALID_PASSWORD = "ERR_INVALID_PASSWORD";
const ERR_DEACTIVE_ACCOUNT = "ERR_DEACTIVE_ACCOUNT";
const SUCCESS_AUTHORIZATION = "SUCCESS_AUTHORIZATION";

const signIn = (req, res) => {
    const { email , password } = req.body;
    console.log(email);
    User.findOne({email}, (err , user) => {
        const exsistStatus = isExsistUser(user);
        const validStatus = isValidUser(user, password);
        const activeStatus = isActiveUser(user);
        if(exsistStatus && validStatus && activeStatus) {
            console.log(SUCCESS_AUTHORIZATION);
            req.session.email = user.email;
            res.json({
                status: SUCCESS_AUTHORIZATION,
                id: req.sessionID
            });
        } else {
            errorHandler([exsistStatus, validStatus, activeStatus], res);
        }
        console.log("End of Authorization");
    })
    .catch(err => res.status(500).json({message: err.message}));
}
function isExsistUser(user) {
    return user ? true : false;
}
function isValidUser(user, formPassword) {
    if(user) return bCrypt.compareSync(formPassword, user.password);
    else return false;
}
function isActiveUser(user) {
    if(user) return user.status === "Active";
    else return false;
}
function errorHandler(errorStatus, res) {
    const [exsistStatus, validStatus, activeStatus] = errorStatus;
    console.log("error");
    switch(false) {
        case(exsistStatus): {
            console.log("Invalid user");
            return res.status(401).json({status: ERR_USER_DOESNT_EXSIST});
        }
        case(validStatus): {
            console.log("Invalid password");
            return res.status(401).json({status: ERR_INVALID_PASSWORD});
        }
        case(activeStatus): {
            console.log("Doesnt active account");
            return res.status(200).json({status: ERR_DEACTIVE_ACCOUNT})
        }
        default: {
            break;
        }
    }
}
module.exports = {
    signIn
}