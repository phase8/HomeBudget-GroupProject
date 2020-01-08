const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const IncomeExpenseSchema = new Schema({
  operationname: String,
  amount: Number,
  date: {
    type: Date
  },
  category: String,
  operationtype: String,
  ispernament: String
});

const IncomeExpense = mongoose.model("IncomesExpense", IncomeExpenseSchema);

module.exports = IncomeExpense;
