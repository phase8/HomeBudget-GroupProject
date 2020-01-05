const Joi = require("joi");

export default function validate(event) {
  let { name, value } = event.target;
  let error;

  switch (name) {
    case "name":
      error = Joi.validate(
        value,
        Joi.string()
          .regex(/^[a-zA-Z0-9,.]*$/)
          .min(5)
          .max(32)
      ).error;
      break;

    case "email":
      error = Joi.validate(
        value,
        Joi.string()
          .regex(/^[a-zA-Z0-9,.@]*$/)
          .min(5)
          .max(255)
          .email()
      ).error;
      break;

    case "password":
      error = Joi.validate(
        value,
        Joi.string()
          .min(8)
          .max(255)
      ).error;
      break;

    default:
      break;
  }
  return error ? error.details[0].message.slice(8) : "";
}
