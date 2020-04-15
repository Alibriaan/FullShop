const mongoose = require('mongoose');

const shopProductsList = mongoose.model("shopProductsList");

const getAllShopProducts = (req, res) => {
    console.log("Get all producst");
    shopProductsList.find({}, (err , list) => {
        if(!list || err) {
            console.log("Fail")
            return res.status(401).json({status: "Fail"});
        } else {
            res.send(list);
            return console.log("Success list");
        }
    })
    .catch(err => res.status(500).json({message: err.message}));
}

module.exports = {
    getAllShopProducts
}