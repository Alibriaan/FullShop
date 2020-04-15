const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const article_schema = new Schema({
  title: String,
  description: String
});

mongoose.model("article", article_schema);