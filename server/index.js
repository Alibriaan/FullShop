const express = require('express');
const mongoose = require("mongoose");
const config = require("./config/app");
require("./app/models/index");

mongoose.Promise = global.Promise



const PORT = process.env.PORT || config.appPort;
const app = express();


require("./config/express")(app);
require("./config/routes")(app);


const Telephone = mongoose.model("telephone");

async function start() {
    try {
        await mongoose.connect(config.mongoUri, {
            useNewUrlParser: true,
            useFindAndModify: false
        });
        console.log("DB success conncection");
        
        app.listen( PORT, function() {
            console.log("Start server side " + PORT );
        })
    } catch(e) {
        console.log("Error");
        console.log(e);
    }
}
start();