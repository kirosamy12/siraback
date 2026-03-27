const { body } = require("express-validator");

const createEntryValidation = [
  body("unitCode")
    .trim()
    .notEmpty()
    .withMessage("Unit code is required")
    .matches(/^[A-Z]-\d+$/i)
    .withMessage("Invalid unit code format (e.g. A-1010)"),
  body("ownerPhone")
    .trim()
    .notEmpty()
    .withMessage("Owner phone is required")
    .matches(/^(\+20|0)?1[0125]\d{8}$/)
    .withMessage("Invalid Egyptian phone number (e.g. 01012345678)"),
];

module.exports = { createEntryValidation };
 