const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const telephoneSchema = new Schema({
  ID: String,
  name: String,
  os: String,
  price: String,
  imgPath: String,
  description: String,
  information: {
      osVersion: String,
      resolution: String,
      matrix: String,
      ram: String,
      memory: String,
      camera: String,
      chip: String,
      battery: String
    }
});

mongoose.model("telephone", telephoneSchema);