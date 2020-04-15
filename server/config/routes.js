const registrationControler = require("../app/controllers/registration");
const authorizationControler = require("../app/controllers/authorization");
const confirmationControler = require("../app/controllers/verification.js");
const confirmationRepeatControler = require("../app/controllers/timeOutVerification.js");
const getProductListControler = require("../app/controllers/getProductList.js");
const mailer = require("./nodemailer");


const testSession = require("../app/controllers/sessionTest.js");

module.exports = (app) => {
  // registration
 app.post("/registration", registrationControler.signUp),
 // authorization 
 app.post("/authorization", authorizationControler.signIn)
 // confirmation 
 app.post("/confirmation", confirmationControler.confirmationAccount);
 // time
 app.post("/confirmation-repeat", confirmationRepeatControler.timeOutVerification);

 // get list of products 
 app.get("/list-of-item", getProductListControler.getAllShopProducts);

 // test 
  app.get("/session", testSession.testSession);
}

/*
app.post('/posts', (req, res) => {
    console.log("Post request");
    new SchemeList.Article({
      title: req.body.title ,
      description: req.body.description
    }).save((err) => {
      if(err) {
        console.log("Error");
        return null;
      };
      console.log("Save");
    })
  });
  
  app.get('/posts', (req, res) => {
    console.log("Get");
    SchemeList.Article.find({}, (err, docs) => {
      if(err) {
        console.log("Get error");
        return null;
      }
      res.send( docs.map( (item) => {
        return { 
        title: item.title,
        description: item.description
      };
    }));
  
    });
  });

  */