const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//create user------------
exports.createUser = async (req, res, next) => {
  try {
    //create a new user in the db
    const { name, email } = req.body;
    const createdUser = await prisma.user.create({
      data: {
        name,
        email
      },
    });
    //return the created user
    res.status(201).json({
      message: "User created successfully",
      user: createdUser,
    });
  } catch (error) {
    next(error)
  }
};
