const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  const { login, password } = req.body;
  try {
    if (
      login &&
      typeof login === 'string' &&
      password &&
      typeof password === 'string'
    ) {
      const userWithLogin = await User.findOne({ login });

      if (userWithLogin) {
        return res
          .status(409)
          .send({ message: 'User with this login already exists' });
      }

      const newUser = new User({
        login,
        password: await bcrypt.hash(password, 10),
      });

      await newUser.save();

      res.status(201).send({ message: 'User ' + newUser.login + ' created!' });
    } else {
      res.status(400).json({ message: 'Bad request' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {};
