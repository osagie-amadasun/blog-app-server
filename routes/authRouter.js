const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authController = require("../controller/authController")

router.post(
  "/signUp",
  [
    check("email")
      .exists()
      .withMessage("email is required")
      .isEmail()
      .withMessage("please provide a valid email"),
  ],
  authController.signUp
);

module.exports = router;
