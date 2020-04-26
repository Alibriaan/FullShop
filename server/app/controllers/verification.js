const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const moment = require("moment");
const User = mongoose.model("User");

const USER_SEARCH_ERROR = "USER_SEARCH_ERROR";
const ERR_USER_DOESNT_EXSIST = "ERR_USER_DOESNT_EXSIST";
const TOKEN_TIMEOUT = "TOKEN_TIMEOUT";
const SUCCESS_STATUS_UPDATE = "SUCCESS_STATUS_UPDATE";
const STATUS_UPDATE_ERROR = "STATUS_UPDATE_ERROR";
const USER_HAVE_ACTIVE_STATUS = "USER_HAVE_ACTIVE_STATUS";

const confirmationAccount = (req, res) => { 
    const tokenBody = jwt.decode(req.body.token);
    const verificationEmail = tokenBody.email;
    const tokenStatus = isExpiredToken(tokenBody.tokenLifeStart);
    User.findOne({email: verificationEmail}, (err , user) => {
        switch(true) {
            case(err || !user): {
                errorHandler(err,user,res);
                break;
            }
            case(tokenStatus === false && isActiveUser(user) === false): {
                console.log(TOKEN_TIMEOUT);
                return res.send({
                    status: TOKEN_TIMEOUT
                });
            }
            case(user.status === "Deactivate"): {
                updateUserStatus(verificationEmail, res);
                break;
            }
            case(user.status === "Active"): {
                console.log(USER_HAVE_ACTIVE_STATUS);
                return res.send({
                    status: USER_HAVE_ACTIVE_STATUS
                });
            }
            default: {
                break;
            }
        }
    })
    .catch(err => res.status(500).json({message: err.message}));
}

function isExpiredToken(tokenLifeStart) {
    const tokenEndLifeTime = moment();
    return tokenEndLifeTime.diff(moment(tokenLifeStart), "minutes") <= 5;
}

function updateUserStatus(verificationEmail, res) {
    User.updateOne({email: verificationEmail}, {status: "Active"}, (err) => {
        if(err) {
            console.log(STATUS_UPDATE_ERROR);
            return res.status(401).json({status: STATUS_UPDATE_ERROR});
        } else {
            console.log(SUCCESS_STATUS_UPDATE);
            return res.send({status: SUCCESS_STATUS_UPDATE});
        }
    });
}

function isActiveUser(user) {
    return user.status === "Active";
}

function errorHandler(err, user, res) {
    if(err) {
        console.log(USER_SEARCH_ERROR);
        return res.status(401).json({
            status: USER_SEARCH_ERROR
        });
    }
    else if(!user) {
        console.log(ERR_USER_DOESNT_EXSIST);
        return res.status(401).json({
            status: ERR_USER_DOESNT_EXSIST
        });
    }
}

module.exports = {
    confirmationAccount
}