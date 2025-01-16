const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

exports.authMiddleware = async (req, res, next) => {
  try {
    //extract the token from the request header
    const token = req.headers.authorization;
    //if token is not present, return an error message
    if (!token) {
      return res.status(401).json({ message: "Token is not present" });
    }
    //if token is present, verify the token and set the user object in the request payload object
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    //get the user from the payload
    const user = await prisma.user.findFirst({
      where: { id: payload.userId },
    });
    if (!user) {
      return res.status(401).json({ message: "Unauthorized user" });
    }
    //attach the user to the current req object
    req.user = user;

    //-----------INTERESTING ERROR NOTE------------
    //so, i ran into an error here, and i later found out how to fix it...apparently, sometimes, you need to put add the "next()" function at the end of the middleware function, to make it move on to the next middleware function...if that makes sense. i didn't run into this issue throughout my application, but for some reason, this was the one middleware function that had to claim strong head.
    next();
  } catch (error) {
    next(error);
  }
};


//honestly....i don't even know what is going on in this middleware function, and if i was asked to explain it, i probably couldn't....but hey...it works, and that's what mattersヾ(≧▽≦*)o