const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//create posts-------------WORKING AS INTENDED
exports.createPost = async (req, res, next) => {
  try {
    const { image, title, body } = req.body;
    const post = await prisma.post.create({
      data: {
        image,
        title,
        body,
      },
    });
    res.status(201).json({
      message: "Post created successfully",
      post: post,
    });
  } catch (error) {
    next(error);
  }
};

//get all posts------------WORKINNG AS INTENDED
exports.getPosts = async (req, res, next) => {
  try {
    const posts = await prisma.post.findMany();
    res.status(200).json({
      message: "Posts retrieved successfully",
      posts: posts,
    });
  } catch (error) {
    next(error);
  }
};

//get singular post----------------WORKING AS INTENDED
exports.getPost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (!post) {
      return res.status(404).json({ message: "Post does not exist" });
    }
    res
      .status(200)
      .json({ message: "Post retrieved successfully", post: post });
  } catch (error) {
    next(error);
  }
};

//update posts--------------WORKING AS INTENDED
exports.updatePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const { image, title, body } = req.body;
    const post = await prisma.post.update({
      where: { id: postId },
      data: {
        image,
        title,
        body,
      },
    });
    res.status(201).json({ message: "Post updated successfully", post: post });
  } catch (error) {
    next(error);
  }
};

//delete comment------------WORKING AS INTENDED
exports.deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (!post) {
      return res.status(404).json({ message: "Post could not be found" });
    }
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
};
