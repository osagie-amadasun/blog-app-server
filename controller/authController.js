const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { hashSync } = require('bcryptjs');

const signUp = async (req, res, next) => {
  const { email, password, name } = req.body;
  //check if the user exists
  let user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }
  //create a new user if user does not exist
  user = prisma.user.create({
    data: {
        name,
        email,
        password: hashSync(password, 10)
  }})
  //send backa response
  res.status(200).json(user)
};

module.exports = signUp