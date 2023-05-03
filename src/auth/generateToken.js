const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '5d',
  algorithm: 'HS256',
};

const generateToken = (payload) => {
  const token = jwt.sign(payload, secretKey, jwtConfig);
  return token;
};

const validateToken = (token) => {
  const validate = jwt.verify(token, secretKey);
  return validate;
};

module.exports = {
  generateToken,
  validateToken,
};