const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const registrationSchema = new Schema({
  email: {
  type:  String,
  unique: true
  },
  password: String,
  status: String,
  basket: Array
});

mongoose.model("User", registrationSchema);