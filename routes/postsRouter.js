const express = require("express");
const router = express.Router();
const postsController = require("../controller/postsController")

router.post("/createPost", postsController.createPost);
router.get("/getPosts", postsController.getPosts);
router.get("/getPost/:id", postsController.getPost);
router.put("/updatePost/:id", postsController.updatePost);
router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;