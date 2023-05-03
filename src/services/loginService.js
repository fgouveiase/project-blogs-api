const { User } = require('../models');
const { generateToken } = require('../auth/generateToken');

const errHttp = (status, message) => ({ status, message });

const newLogin = async (email, password) => {
  if (!email || !password) throw errHttp(400, 'Some required fields are missing');
  const user = await User.findOne({ where: { email } });
  if (!user) throw errHttp(400, 'Invalid fields');
  delete user.dataValues.password;
  const token = generateToken(user.dataValues);
  return token;
};

module.exports = { 
  newLogin,
};