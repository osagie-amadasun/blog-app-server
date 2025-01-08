const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { validationResult } = require("express-validator");

//create comment
exports.createComment = async (req, res, next) => {
  try {
    //create a new comment in the database
    const { email, content } = req.body;
    //validate the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const createdComment = await prisma.comments.create({
      data: {
        email,
        content,
      },
    });
    //respond with the created comment in the db
    res.status(201).json(comment);
  } catch (error) {
    console.error("Error creating comment: ", next(error));
  }
};

//get all comments
exports.getComments = async (req, res, next) => {
  try {
    const comments = await prisma.comments.findMany();

    res.json(comments);
  } catch (error) {
    next(error);
  }
};

//get single comment by id              //PENDING=======================
exports.getComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).send();
    }
    res.status(200).send(comment);
  } catch (error) {
    next(error);
  }
};

//update comment
exports.updateComment = async (req, res, next) => {
  try {
    const commentId = parseInt(req.params.id);
    const comments = await prisma.comments.findUnique({
      where: {
        id: commentId,
      },
    });
    if (!comments) {
      return res.status(404).json({ error: "Comment not found ❌" });
    }
    const { email, comment } = req.body;
    const updatedComment = await prisma.comments.update({
      where: {
        id: commentId,
      },
      data: {
        email,
        comment,
      },
    });
    res.json(updatedComment);
  } catch (error) {
    next(error);
  }
};

//delete comment
exports.deleteComment = async (req, res) => {
  try {
    const commentId = parseInt(req.params.id);
    const comments = await prisma.comments.findUnique({
      where: {
        id: commentId,
      },
    });
    if (!comments) {
      return res
        .status(404)
        .json({ error: "that which cant be found cant be deleted😞" });
    }
    await prisma.comments.delete({
      where: {
        id: commentId,
      },
    });

    res.json({ message: "Comment deleted successfully ✅" });
  } catch (error) {
    res.status(500).send(error);
  }
};
