const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const { User } = require("../models/user");

router.post("/:type", async (req, res) => {
  let type = req.params.type;
  let current = req.body.user;

  {
    let { error } = validateAuth(current);
    if (error) return res.status(400).send(error.details[0].message);
  }
  {
    let { error } = validateChange(type, {
      [type]: req.body[type]
    });
    if (error) return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: current.email });
  if (!user)
    return res
      .status(400)
      .send(
        "Something went wrong! Looks like your account is a ghost O.o Try again"
      );

  const validPassword = await bcrypt.compare(current.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid password.");

  if (type === "password") {
    const salt = await bcrypt.genSalt(10);
    req.body[type] = await bcrypt.hash(req.body.password, salt);
  }
  await user.update({ [type]: req.body[type] });
  const token = user.generateToken();

  user = await User.findOne({ _id: user.id });
  res.send({ ..._.pick(user, ["name", "email"]), token });
});

function validateAuth(req) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(8)
      .max(255)
      .required()
  };

  return Joi.validate(req, schema);
}

function validateChange(dataType, req) {
  let schema = {};

  switch (dataType) {
    case "name":
      schema = {
        name: Joi.string()
          .regex(/^[a-zA-Z0-9,.]*$/)
          .min(5)
          .max(32)
          .required()
      };
      break;

    case "email":
      schema = {
        email: Joi.string()
          .regex(/^[a-zA-Z0-9,.@]*$/)
          .min(5)
          .max(255)
          .required()
          .email()
      };
      break;

    case "password":
      schema = {
        password: Joi.string()
          .min(8)
          .max(255)
          .required()
      };
      break;
  }
  return Joi.validate(req, schema);
}
module.exports = router;
