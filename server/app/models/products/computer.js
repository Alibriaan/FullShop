const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const telephoneSchema = new Schema({
  name: String,
  os: String,
  information: {
      type: Object,
      osVersion: String,
      resolution: String,
      matrix: String,
      ram: String,
      memory: String,
      videoCard: String,
      processor: String
    }
});

mongoose.model("computer", telephoneSchema);