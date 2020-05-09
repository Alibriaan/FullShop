const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shopProductsList_schema = new Schema({
  name: String,
  title: String,
  status: String
});

mongoose.model("shopProductsList", shopProductsList_schema);