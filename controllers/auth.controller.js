const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  const { login, password, avatar, telephone } = req.body;

  if (
    login &&
    typeof login === 'string' &&
    password &&
    typeof password === 'string'
  ) {
    const userWithLogin = await User.findOnde({ login });
    if (userWithLogin) {
      res.status(409).send({ message: 'User with this login already exists' });
    }

    const user = new User({ login, password });
    res.send('register');
  }
};

exports.login = async (req, res) => {};
