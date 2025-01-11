const express = require("express");
const router = express.Router();
const usersController = require("../controller/usersController")

router.post("/createUser", usersController.createUser);
router.get("/getUsers", usersController.getAllUsers);
router.get("/getUser/:id", usersController.getSingleUser);
router.put("/updateUser/:id", usersController.updateUser);
router.delete("/deleteUser/:id", usersController.deleteUser);

module.exports = router;