import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import * as jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  //extract the token from header
  const token = req.headers.authorization;
  //if token isn't present, throw an error of unauthorized
  if (!token) {
    next(new Error("Unauthorized"));
  }
  //if the token is present, verify the token and extract the payload
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    //get the user from the payload
    const user = await prisma.user.findFirst({
        where: {
            id: payload.userId
        }
    })
    //attach the user to the current req object
  } catch (error) {
    next(error);
  }
};
