const mongoose = require("mongoose");
const fs = require('fs');
const path = require("path")

let shopItemsList = {};

async function getAllProductsList() {
    mongoose.model("shopProductsList").find({}, async (err , list) => {
        if(err) {
            throw("List get error");
        } else {
            await getProducts(list);
        }
        // console.log(shopItemsList);
    });
}

async function getProducts(productName) {
    for (const item of productName) {
        // console.log(item.name);
        const productModel = mongoose.model(item.name);
        await productModel.find({}, (err, list) => {
            if(err) {
                console.log(err);
                throw(`${item} List get error`);
            } else {
                shopItemsList[item.name] = parseImgToBase64(list);;
            }
        })
    }
}

function parseImgToBase64(arr) {
    console.log("Start parse");
    return arr.map(item => {
        const bitmap = fs.readFileSync(path.join(__dirname, "..", "assets" , ...item.imgPath.split("/")), "base64");
        // console.log(bitmap);
        item.imgPath = bitmap
        return item
    })
}

module.exports = {
    shopItemsList,
    getAllProductsList,
    parseImgToBase64
}