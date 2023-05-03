const express = require('express');
const { userController } = require('../controllers');
const { auth } = require('../middlewares/auth');

const userRouter = express.Router();

userRouter.post('/', userController.create);
userRouter.get('/', auth, userController.getUser);
userRouter.get('/:id', auth, userController.getUserById);
userRouter.delete('/me', auth, userController.userDelete);

module.exports = userRouter;