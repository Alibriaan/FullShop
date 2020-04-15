const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shopProductsList_schema = new Schema({
  name: String,
  title: String
});

mongoose.model("shopProductsList", shopProductsList_schema);