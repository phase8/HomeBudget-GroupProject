const express = require("express");
var cors = require("cors");

const users = require("../routes/users");
const auth = require("../routes/auth");

module.exports = function(app) {
  app.use(cors());
  app.use(express.json());
  app.use("/api/users", users);
  app.use("/api/auth", auth);
};
