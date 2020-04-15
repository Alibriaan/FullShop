const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const session = require("express-session");
const config  = require("./app");
const mongoose = require("mongoose");
const MongoStore = require('connect-mongo')(session);


const connection = mongoose.createConnection(config.mongoUri);

module.exports = (app) => {
    app.use(bodyParser.json());
    app.use(session({
        rolling: true,
        secret: config.sessionSecretKey,
        resave: false,
        saveUninitialized: false,
        cookie: {
            path: "/",
            httpOnly: false,
            maxAge: null,
            secure: false
        },
        store: new MongoStore({mongooseConnection: connection,
        ttl: 0.5 * 24 * 60 * 60})
    }))
    app.use(morgan("combined"));
    app.use(cors());
}