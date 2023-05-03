const { createUser, getUsers, getById, deleteUser } = require('../services/userService');

const create = async (req, res, next) => {
    try {
      const { displayName, email, password, image } = req.body;
  
      const newUser = await createUser(displayName, email, password, image);
  
      return res.status(201).json({ token: newUser });
    } catch (error) {
      return next(error);
    }
  };

  const getUser = async (_req, res, next) => {
    try {
      const users = await getUsers();
  
      return res.status(200).json(users);
    } catch (error) {
      return next(error);
    }
  };

  const getUserById = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const user = await getById(id);
  
      return res.status(200).json(user);
    } catch (err) {
      return next(err);
    }
  };

  const userDelete = async (req, res, next) => {
    try {
      const { id } = req.user;
  
      await deleteUser(id);
  
      return res.status(204).end();
    } catch (error) {
      next(error);
    }
  };

  module.exports = {
    create,
    getUser,
    getUserById,
    userDelete,
   };