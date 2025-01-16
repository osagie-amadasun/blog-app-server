const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../uploads")); // Use absolute path
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
const upload = multer({ storage });
const postsController = require("../controller/postsController");

router.post("/createPost", postsController.createPost);
//-----------under testing-----------
router.post("/uploadFile", upload.single("image"), postsController.uploadImage);
//-----------------------------------
router.get("/getPosts", postsController.getPosts);
router.get("/getPost/:id", postsController.getPost);
router.put("/updatePost/:id", postsController.updatePost);
router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;
