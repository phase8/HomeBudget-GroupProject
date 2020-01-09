const express = require("express");
var cors = require("cors");

const user = require("../routes/user");
const users = require("../routes/users");
const auth = require("../routes/auth");
const OperationsAndGoals = require("../routes/OperationsAndGoals");
const Category = require("../routes/Category");
const History = require("../routes/History");

module.exports = function (app) {
  app.use(cors());
  app.use(express.json());
  app.use("/api/user", user);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/OperationsAndGoals", OperationsAndGoals);
  app.use("/api/History", History);
  app.use("/api/categories", Category);
};