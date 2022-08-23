const User = require('../models/user.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await User.find());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const usr = await User.findById(req.params.id);
    if (!usr) res.status(404).json({ message: 'Not found' });
    else res.json(usr);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
