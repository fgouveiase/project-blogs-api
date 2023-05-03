const { postService } = require('../services');

const createPost = async (req, res, next) => {
    try {
      const { title, content, categoryIds } = req.body;
      const { id } = req.user;
  
      const post = await postService.createPost(title, content, categoryIds, id);
  
      return res.status(201).json(post);
    } catch (error) {
      next(error);
    }
  };
  
  const getPosts = async (req, res, next) => {
    try {
      const { id } = req.user;
  
      const posts = await postService.getPosts(id);
  
      return res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  };

  const getById = async (req, res) => {
    try {
      const { id } = req.params;
      const post = await postService.getById(id);
      if (!post) return res.status(404).json({ message: 'Post does not exist' });
      return res.status(200).json(post);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  };

  const changePost = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
      const { id: userId } = req.user;
  
      const postChanged = await postService.changePost(+id, title, content, +userId);
  
      return res.status(200).json(postChanged);
    } catch (erro) {
      next(erro);
    }
  };

  const deletePost = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { id: userId } = req.user;
  
      await postService.deletePost(+id, +userId);
  
      return res.status(204).end();
    } catch (error) {
      next(error);
    }
  };

  module.exports = { createPost, getPosts, getById, changePost, deletePost };