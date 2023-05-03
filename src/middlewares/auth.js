const jwt = require('jsonwebtoken');

const key = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
  try {
    const token = req.header('authorization');
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  const decoded = jwt.verify(token, key);
  req.user = decoded;
  next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  auth,
};