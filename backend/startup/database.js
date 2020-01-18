const mongoose = require("mongoose");

module.exports = function() {
  mongoose
    .connect("mongodb://localhost/budget", { useNewUrlParser: true })
    .then(() => console.log("connected to MongoDB"))
    .catch(err => console.error("Could not connect to MongoDB...", err));
};
