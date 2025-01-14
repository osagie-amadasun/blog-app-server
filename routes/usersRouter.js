const express = require("express");
const router = express.Router();
const usersController = require("../controller/usersController");
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
router.get("/getUsers", usersController.getAllUsers);
router.get("/getUser/:id", usersController.getSingleUser);
router.put("/updateUser/:id", usersController.updateUser);
router.delete("/deleteUser/:id", usersController.deleteUser);
router.post("/signup", usersController.signUp);
router.post("/login", usersController.logIn);

module.exports = router;
