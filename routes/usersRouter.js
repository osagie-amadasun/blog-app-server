const express = require("express");
const router = express.Router();
const usersController = require("../controller/usersController")

router.post("/createUser", usersController.createUser);

module.exports = router;