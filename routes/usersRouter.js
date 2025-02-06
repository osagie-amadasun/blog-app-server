const express = require("express");
const router = express.Router();
const usersController = require("../controller/usersController");
const usersAuth = require("../middleware/usersAuth");
const { check } = require("express-validator");

router.post(
  "/createUser",
  [
    check("email")
      .exists()
      .withMessage("email is required")
      .isEmail()
      .withMessage("please provide a valid email"),
  ],
  usersController.createUser
);
router.post("/signup", [
  check("email")
  .exists()
  .withMessage("email is required")
  .isEmail()
  .withMessage("please provide a valid email"),
  check("password")
  .exists()
  .withMessage("password is required")
  .isLength({ min: 6 })
  .withMessage("password must be at least 6 characters long")
], usersController.signUp);
router.post("/login", usersController.logIn);
router.get("/getUsers", usersController.getAllUsers);
router.get("/getUser/:id", usersController.getSingleUser);
router.get("/me", [usersAuth.authMiddleware], usersController.me)
router.put("/updateUser/:id", usersController.updateUser);
router.delete("/deleteUser/:id", usersController.deleteUser);

module.exports = router;
