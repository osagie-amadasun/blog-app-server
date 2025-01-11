const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const commentsController = require("../controller/commentsController");

router.post(
  "/createComment",
  [
    check("email")
      .exists()
      .withMessage("email is required")
      .isEmail()
      .withMessage("please provide a valid email"),
  ],
  commentsController.createComment
);
router.get("/getComments", commentsController.getComments);
router.get("/getComment/:id", commentsController.getComment);
router.put("/updateComment/:id", commentsController.updateComment);
router.delete("/deleteComment/:id", commentsController.deleteComment);

module.exports = router;
