const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const routerController = require('../controller/commentsController');


router.post('/created', [check("email").exists().withMessage("email is required").isEmail().withMessage("please provide a valid email")], routerController.createComment);
router.get('/allComments', routerController.getComments);
router.get('/comment/:id', routerController.getComment);
router.put('/updateComment:id', routerController.updateComment);
router.delete('/deleteComment/:id', routerController.deleteComment);

module.exports = router;