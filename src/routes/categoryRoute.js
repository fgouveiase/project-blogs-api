const express = require('express');
const { categoryController } = require('../controllers');
const { auth } = require('../middlewares/auth');

const categoryRouter = express.Router();

categoryRouter.post('/', auth, categoryController.createNewCategory);
categoryRouter.get('/', auth, categoryController.getCategories); 

module.exports = categoryRouter;