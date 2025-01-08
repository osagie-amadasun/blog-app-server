const Post = require('../models/Post');
const Comment = require('../models/Comment');

// Get all posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('comments');
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single post by ID
exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('comments');
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new post
exports.createPost = async (req, res) => {
    const post = new Post(req.body);
    try {
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a post by ID
exports.updatePost = async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPost) return res.status(404).json({ message: 'Post not found' });
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a post by ID
exports.deletePost = async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) return res.status(404).json({ message: 'Post not found' });
        res.status(200).json({ message: 'Post deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a comment to a post
exports.addComment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        const comment = new Comment(req.body);
        comment.post = post._id;
        await comment.save();

        post.comments.push(comment);
        await post.save();

        res.status(201).json(comment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all comments for a post
exports.getComments = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('comments');
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.status(200).json(post.comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
