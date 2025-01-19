const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const sanitizeHtml = require("sanitize-html");

//create posts-------------WORKING AS INTENDED
exports.createPost = async (req, res, next) => {
  try {
    const { title, author, image, content } = req.body;

    // sanitize user input
    const sanitizedContent = sanitizeHtml(content);

    const post = await prisma.post.create({
      data: {
        title,
        author,
        image,
        content: sanitizedContent,
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
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
    });
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
      include: {
        comments: true,
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
    const { title, author, image, content } = req.body;
    const post = await prisma.post.update({
      where: { id: postId },
      data: {
        title,
        author,
        image,
        content,
      },
    });
    res.status(201).json({ message: "Post updated successfully", post: post });
  } catch (error) {
    next(error);
  }
};

//delete post------------WORKING AS INTENDED
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

//----------------handle image upload--------------------
exports.uploadImage = (req, res, next) => {
  res.json(req.file);
};
