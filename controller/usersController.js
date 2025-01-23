const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { hashSync, compareSync } = require("bcryptjs");

//---------------CRUD OPERATION LOGIC FOR USER--------------------

//create user----------------WORKING AS INTENDED
exports.createUser = async (req, res, next) => {
  try {
    //create a new user in the db
    const { name, email, password } = req.body;
    //validate the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const createdUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashSync(password, 10)
      },
    });
    //return the created user
    res.status(201).json({
      message: "User created successfully",
      user: createdUser,
    });
  } catch (error) {
    next(error);
  }
};

//get all users---------------WORKING AS INTENDED
exports.getAllUsers = async (req, res, next) => {
  try {
    //get all users from the db
    const users = await prisma.user.findMany();
    //return the users
    res.status(200).json({
      message: "Users retrieved successfully",
      users: users,
    });
  } catch (error) {
    next(error);
  }
};

//get single user-------------WORKING AS INTENDED
exports.getSingleUser = async (req, res, next) => {
  try {
    //get the id of the user from the params
    const userId = req.params.id;
    //get the user from the db
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    //return the user
    res.status(200).json({
      message: "User retrieved successfully",
      user: user,
    });
  } catch (error) {
    next(error);
  }
};

//update user----------------WORKING AS INTENDED
exports.updateUser = async (req, res, next) => {
  try {
    //get the id of the user from the params
    const userId = req.params.id;
    //get the user from the db
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    //update the user
    const { name, email } = req.body;
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        email,
      },
    });
    //return the updated user
    res.status(201).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

//delete user---------------WORKING AS INTENDED
exports.deleteUser = async (req, res, next) => {
  try {
    //get the id of the user from the params
    const userId = req.params.id;
    //delete the user
    const deletedUser = await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    //return the deleted user
    res.status(200).json({
      message: "User deleted successfully",
      user: deletedUser,
    });
  } catch (error) {
    next(error);
  }
};

//-----------------AUTHENTICATION LOGIC---------------------

//SignUp new user-----------------WORKING AS INTENDED
exports.signUp = async (req, res, next) => {
  //validation logic
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { name, email, password } = req.body;
    //check if the user exists
    let user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    //create a new user if user does not exist
    newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashSync(password, 10),
      },
    });
    //send back a response
    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
};

//Login existing user--------------------WORKING AS INTENDED
exports.logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //check if the user exists
    let user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    //check if the password is correct
    if (!compareSync(password, user.password)) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    //generate token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h"
    });

    res.status(200).json({
      message: "User logged in successfully",
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    next(error);
  }
};

//create a me api--------------------
exports.me = async (req, res) => {
  res.json(req.user);
}