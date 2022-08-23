const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  try {
    const { login, password, telephone } = req.body;
    const avatar = req.file.path;

    if (
      login &&
      typeof login === 'string' &&
      password &&
      typeof password === 'string'
    ) {
      const userCheck = await User.findOne({ login });

      if (userCheck) {
        return res
          .status(409)
          .send({ message: 'User with this login already exists' });
      }

      const newUser = new User({
        login,
        password: await bcrypt.hash(password, 10),
        avatar,
        telephone,
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

exports.login = async (req, res) => {
  try {
    const { login, password } = req.body;

    if (
      login &&
      typeof login === 'string' &&
      password &&
      typeof password === 'string'
    ) {
      const userCheck = await User.findOne({ login });

      if (!userCheck) {
        return res.status(400).send({ message: 'Login or user are incorrect' });
      }

      if (bcrypt.compareSync(password, userCheck.password)) {
        res.status(200).send({ message: 'Login successful' });
      } else {
        return res.status(400).send({ message: 'Login or user are incorrect' });
      }
    } else {
      res.status(400).json({ message: 'Bad request' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
