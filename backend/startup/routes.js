const express = require("express");
var cors = require("cors");

const users = require("../routes/users");
const auth = require("../routes/auth");
const OperationsAndGoals = require("../routes/OperationsAndGoals");


module.exports = function (app) {
  app.use(cors());
  app.use(express.json());
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use('/api/OperationsAndGoals', OperationsAndGoals);

};