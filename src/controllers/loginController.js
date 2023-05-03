const { newLogin } = require('../services/loginService');

const loginNew = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const login = await newLogin(email, password);

    return res.status(200).json({ token: login });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
 loginNew,
};