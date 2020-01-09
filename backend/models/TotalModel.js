const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;
const TotalSchema = new Schema({
  body: Number
});

// Model
const TotalModel = mongoose.model("totalModel", TotalSchema);
module.exports = TotalModel;
