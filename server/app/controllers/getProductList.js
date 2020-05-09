const mongoose = require('mongoose');
let shopItemList = require("../../config/data.js").shopItemsList;

const shopProductsList = mongoose.model("shopProductsList");

const GET_LIST_ERROR = "GET_LIST_ERROR";
const ERR_EMPTY_LIST = "ERR_EMPTY_LIST";
const SUCCES_GET_LIST_OF_ITEMS = "SUCCES_GET_LIST_OF_ITEMS";
const SERVER_GET_DATA_ERROR = "SERVER_GET_DATA_ERROR";
const SUCCESS_SEND = "SUCCESS_SEND";

const getAllShopProducts = (req, res) => {
    console.log("Get all producst");
    shopProductsList.find({}, (err , list) => {
        if(err) {
            console.log(GET_LIST_ERROR)
            return res.status(401).json({
                status: GET_LIST_ERROR
            });
        } else if(!list ) {
            console.log(ERR_EMPTY_LIST)
            return res.status(401).json({
                status: ERR_EMPTY_LIST
            });
        } else {
            console.log(SUCCES_GET_LIST_OF_ITEMS);
            res.send(list);
            return console.log({
                status: SUCCES_GET_LIST_OF_ITEMS,
                payload: list
            });
        }
    })
    .catch(err => res.status(500).json({message: err.message}));
}


const getProductList = (req, res) => { 
    console.log("product list");
    console.log(req.body);
    const list = shopItemList[req.body.type];
    console.log(list);
    if(list.length) {
        res.send({
            status: SUCCESS_SEND,
            payload: list
         })
    } else {
        res.status(401).json({
            status: SERVER_GET_DATA_ERROR
        });
    }
}

module.exports = {
    getAllShopProducts,
    getProductList
}