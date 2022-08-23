const Ad = require('../models/ad.model');
const User = require('../models/user.model');
const escapeHTML = require('../utils/escapeHTML');

exports.getAll = async (req, res) => {
  try {
    res.json(await Ad.find().populate('user'));
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getOne = async (req, res) => {
  try {
    const usr = await Ad.findById(req.params.id);
    if (!usr) res.status(404).json({ message: 'Not found' });
    else res.json(usr);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.postOne = async (req, res) => {
  try {
    const { title, description, date, price, location, user } = escapeHTML(
      req.body
    );
    const image = req.file.path;

    const userMatch = await User.findOne({ login: user.login });

    if (!userMatch) {
      res.status(409).json({ message: 'User does not exist!' });
    } else {
      const newAd = new Ad({
        title,
        description,
        date,
        image,
        price,
        location,
        user,
      });
      await newAd.save();
      res.json({ message: 'Ad Successfully Added!' });
    }
  } catch (err) {
    res.status(500).json({ message: err.messsage });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    // const { user } = escapeHTML(req.body);

    // const userMatch = await User.findOne({ user: user._id });
    // const adMatch = await Ad.findOne({ user: userMatch._id });

    // if (!userMatch) {
    //   res
    //     .status(403)
    //     .json({ message: 'Request cannot be processed by this user.' });
    // }

    const ad = await Ad.findOneAndDelete({ _id: req.params.id });
    if (ad) {
      res.json({ message: 'Successfully Deleted!' });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err.messsage });
  }
};

exports.putOne = async (req, res) => {
  try {
    const { title, description, date, price, location } = escapeHTML(req.body);
    const image = req.file.path;

    const usr = await Ad.findById(req.params.id);
    if (usr) {
      const updatedAd = await Ad.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            title,
            description,
            date,
            image,
            price,
            location,
          },
        },
        { new: true }
      );
      res.json({ message: 'Successfully Added!' });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err.messsage });
  }
};

exports.searchByTitle = async (req, res) => {
  try {
    const searchResult = await Ad.find({
      title: { $regex: req.params.searchPhrase, $options: 'smix' },
    });

    res.json(searchResult);
  } catch (err) {
    res.status(500).json({ message: err.messsage });
  }
};
