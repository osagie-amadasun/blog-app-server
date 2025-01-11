const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//create user----------------WORKING AS INTENDED
exports.createUser = async (req, res, next) => {
  try {
    //create a new user in the db
    const { name, email } = req.body;
    const createdUser = await prisma.user.create({
      data: {
        name,
        email,
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

//delete user---------------
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
