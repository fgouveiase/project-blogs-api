const { createCategory, getCategory } = require('../services/categoryService');

const createNewCategory = async (req, res) => {
  try {
    const name = req.body;
     if (name) {
      const category = await createCategory(name);
      res.status(201).json(category);
    }
  } catch (err) {
    res.status(400).json({ message: '"name" is required' });
  }
};

const getCategories = async (_req, res, next) => {
    try {
      const categories = await getCategory();
  
      res.status(200).json(categories);
    } catch (error) {
     next(error);
    }
  };
  
module.exports = {
  createNewCategory,
  getCategories,
};