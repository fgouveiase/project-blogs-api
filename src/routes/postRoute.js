const express = require('express');
const { postController } = require('../controllers');
const { auth } = require('../middlewares/auth');

const postRouter = express.Router();

postRouter.post('/', auth, postController.createPost);
postRouter.get('/', auth, postController.getPosts);
postRouter.get('/:id', auth, postController.getById);
postRouter.put('/:id', auth, postController.changePost);
postRouter.delete('/:id', auth, postController.deletePost);

module.exports = postRouter;