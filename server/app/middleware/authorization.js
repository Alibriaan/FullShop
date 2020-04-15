const jwt = require("jsonwebtoken")
const config = require("../../config/app");
// пока что юзелес
module.exports = (req, res, next) => {
    const authHeader = req.get("Authorization");
    console.log("AuthHeader");
    console.log(authHeader);
    if(!authHeader) {
        res.status(401).json({message: "Token not provided!"});
    }

    // const token = authHeader.replace("Bearer ", "");
    // try {
    //     jwt.verify(token, config.bcryptSecretKey);
    // } catch(e) {
    //     if(e instanceof jwt.JsonWebTokenError) {
    //         res.status(401).json({message: "Invalid token!"});

    //     }
    // }

    next();
};