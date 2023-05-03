const { User } = require('../models');
const { generateToken } = require('../auth/generateToken');
//

const err = (status, message) => ({ status, message });

const createUser = async (displayName, email, password, image = '') => {
  if (displayName.length < 8) {
    throw err(400, '"displayName" length must be at least 8 characters long');
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    throw err(400, '"email" must be a valid email');
  }
  if (password.length < 6) {
    throw err(400, '"password" length must be at least 6 characters long');
  }
  if (await User.findOne({ where: { email } })) {
    throw err(409, 'User already registered');
  }
  const newUser = await User.create({ displayName, email, password, image });
  delete newUser.dataValues.password;
  const token = generateToken(newUser.dataValues);
  return token;
};

const getUsers = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });

  return users;
};

const getById = async (id) => {
    const user = await User.findOne({
      where: { id },
      attributes: { exclude: ['password'] },
    });
    if (!user) throw err(404, 'User does not exist');
    return user;
  };

  const deleteUser = async (id) => {
    await User.destroy({ where: { id } });
  };

module.exports = { createUser, getUsers, getById, deleteUser };