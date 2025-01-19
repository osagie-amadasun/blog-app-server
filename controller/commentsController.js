const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { validationResult } = require("express-validator");

//create comment------------WORKING AS INTENDED
exports.createComment = async (req, res, next) => {
  try {
    //create a new comment in the database
    const { user, post, email, message } = req.body;
    //validate the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const createdComment = await prisma.comment.create({
      data: {
        user: {
          connect: {
            id: user,
          },
        },
        email,
        message,
        post: {
          connect: {
            id: post,
          },
        },
      },
    });
    //respond with the created comment in the db
    res.status(201).json({
      message: "Comment created successfully",
      createdComment,
    });
  } catch (error) {
    next(error);
  }
};

//get all comments-----------WORKIG AS INTENDED
exports.getComments = async (req, res, next) => {
  try {
    const comments = await prisma.comment.findMany();

    res.json(comments);
  } catch (error) {
    next(error);
  }
};

//get single comment by id-------------WORKING AS INTENDED
exports.getComment = async (req, res, next) => {
  try {
    const id = req.params.id;
    const comment = await prisma.comment.findUnique({
      where: {
        id,
      },
    });
    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }
    res.status(200).json({
      message: "Comment found",
      comment,
    });
  } catch (error) {
    next(error);
  }
};

//update comment-------------WORKING AS INTENDED
exports.updateComment = async (req, res, next) => {
  try {
    const commentId = req.params.id;
    const comments = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });
    if (!comments) {
      return res.status(404).json({
        error: "comment not found, please provide a valid id",
      });
    }
    const { user, message } = req.body;
    const updatedComment = await prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        user,
        message,
      },
    });
    res.status(201).json(updatedComment);
  } catch (error) {
    next(error);
  }
};

//delete comment-------------WORKING AS INTENDED
exports.deleteComment = async (req, res, next) => {
  try {
    const commentId = req.params.id;
    const comments = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });
    if (!comments) {
      return res.status(404).json({ error: "the comment could not be found" });
    }
    await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });

    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    next(error);
  }
};

//---------EVERYTHING IS WORKING REMARKABLY, DON'T FUCKING TOUCH ANYTHING!!!---------😡....as a matter of fact, i am pushing this to the remote repo right now
