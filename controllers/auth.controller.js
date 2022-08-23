const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  const { login, password } = req.body;

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

    const newUser = new User({
      login,
      password: await bcrypt.hash(password, 10),
    });

    await newUser.save();

    res.status(201).send({ message: 'User ' + newUser.login + ' created!' });
  }
};

exports.login = async (req, res) => {};
