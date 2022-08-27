const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const escapeHTML = require('../utils/escapeHTML');
const getImageFileType = require('../utils/getImageFileType');

exports.register = async (req, res) => {
  try {
    for (let param in req.body) {
      req.body[param] = escapeHTML(req.body[param]);
    }

    const { login, password, telephone } = req.body;
    const avatar = req.file.filename;

    const fileType = req.file ? await getImageFileType(req.file) : 'Unknown';

    if (
      login &&
      typeof login === 'string' &&
      password &&
      typeof password === 'string' &&
      req.file &&
      ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)
    ) {
      const userCheck = await User.findOne({ login });

      if (userCheck) {
        return (
          fs.unlinkSync(req.file.path),
          res
            .status(409)
            .send({ message: 'User with this login already exists' })
        );
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
    for (let param in req.body) {
      req.body[param] = escapeHTML(req.body[param]);
    }

    const { login, password } = req.body;

    if (
      login &&
      typeof login === 'string' &&
      password &&
      typeof password === 'string'
    ) {
      const user = await User.findOne({ login });

      if (!user) {
        return res.status(400).send({ message: 'Login or user are incorrect' });
      }

      if (bcrypt.compareSync(password, user.password)) {
        req.session.user = { id: user._id, login: user.login };
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

exports.getUser = async (req, res) => {
  res.status(200).send(req.session.user);
};

exports.logout = async (req, res) => {
  try {
    req.session.destroy();
    res.status(200).send({ message: 'User logged out' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
