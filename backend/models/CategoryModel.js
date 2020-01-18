const mongoose = require("mongoose");

const types = {
  INCOME: "INCOME",
  EXPENSE: "EXPENSE"
};

const Schema = mongoose.Schema;
const CategorySchema = new Schema({
  userid: String,
  name: String,
  type: {
    type: String,
    enum: [types.INCOME, types.EXPENSE],
    default: types.INCOME
  }
});

const CategoryModel = mongoose.model("CategoryModel", CategorySchema);

module.exports = {
  types,
  CategoryModel
};
