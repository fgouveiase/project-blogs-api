const { BlogPost, Category, PostCategory, User } = require('../models');

const err = (status, message) => ({ status, message });

const fieldValidation = async (title, content, categoryIds) => {
  if (!title || !content || !categoryIds) {
    throw err(400, 'Some required fields are missing');
  }
  const categories = await Category.findAll({ where: { id: categoryIds } });
  if (categories.length !== categoryIds.length) {
    throw err(400, 'one or more "categoryIds" not found');
  }
};

const createPost = async (title, content, categoryIds, userId) => {
  await fieldValidation(title, content, categoryIds);

  const newPost = await BlogPost.create({
    title,
    content,
    userId,
    published: new Date(),
    updated: new Date(),
  });

  await PostCategory.bulkCreate(
    categoryIds.map((categoryId) => ({
      postId: newPost.id,
      categoryId,
    })),
  );

  return newPost;
};
const getPosts = async (userId) => {
  const posts = await BlogPost.findAll({
    where: { userId },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });

  return posts;
};

const getById = async (id) => {
    const post = await BlogPost.findOne({
      where: { id },
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories' },
      ],
    });

    return post;
  };

  const changePost = async (id, title, content, userId) => {
      if (!title || !content) {
        throw err(400, 'Some required fields are missing');
      }
    if (id !== userId) {
      throw err(401, 'Unauthorized user');
    }
    await BlogPost.update({ title, content, updated: new Date() }, { where: { id } });
    const updatedPost = await getById(id);
    return updatedPost;
  };

  const getPostById = async (id) => {
    const post = await BlogPost.findOne({ where: { id } });
    return post;
  };

  const deletePost = async (id, userId) => {
    const post = await BlogPost.findOne({ where: { id } });
    if (!post) throw err(404, 'Post does not exist');
    if (post.userId !== userId) throw err(401, 'Unauthorized user');
    await BlogPost.destroy({ where: { id } });
  };
  
module.exports = { createPost, getPosts, getById, getPostById, changePost, deletePost };