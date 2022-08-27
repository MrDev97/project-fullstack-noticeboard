const Ad = require('../models/ad.model');
const escapeHTML = require('../utils/escapeHTML');
const getImageFileType = require('../utils/getImageFileType');

exports.getAll = async (req, res) => {
  try {
    res.json(await Ad.find().populate('user'));
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getOne = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) res.status(404).json({ message: 'Not found' });
    else res.json(ad);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.postOne = async (req, res) => {
  try {
    for (let param in req.body) {
      req.body[param] = escapeHTML(req.body[param]);
    }

    const { title, description, date, price, location } = req.body;
    const image = req.file.filename;
    const user = req.session.user;

    const fileType = req.file ? await getImageFileType(req.file) : 'Unknown';

    if (
      title &&
      typeof title === 'string' &&
      description &&
      typeof description === 'string' &&
      date &&
      typeof date === 'string' &&
      price &&
      typeof price === 'number' &&
      location &&
      typeof location === 'string' &&
      req.file &&
      ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)
    ) {
      const newAd = new Ad({
        title,
        description,
        date,
        image,
        price,
        location,
        user: user.id,
      });
      await newAd.save();
      res.status(201).json({ message: 'Ad Successfully Created!' });
    } else {
      fs.unlinkSync(req.file.path);
      res.status(400).json({ message: 'Bad Request' });
    }
  } catch (err) {
    res.status(500).json({ message: err.messsage });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const user = req.session.user;

    const ad = await Ad.findOneAndDelete({
      _id: req.params.id,
      user: user.id,
    });
    if (ad) {
      res.json({ message: 'Successfully Deleted!' });
    } else res.status(403).json({ message: 'Forbidden Action!' });
  } catch (err) {
    res.status(500).json({ message: err.messsage });
  }
};

exports.putOne = async (req, res) => {
  try {
    for (let param in req.body) {
      req.body[param] = escapeHTML(req.body[param]);
    }

    const { title, description, date, price, location } = req.body;
    const image = req.file.filename;
    const user = req.session.user;

    const fileType = req.file ? await getImageFileType(req.file) : 'Unknown';

    if (
      title &&
      typeof title === 'string' &&
      description &&
      typeof description === 'string' &&
      date &&
      typeof date === 'string' &&
      price &&
      typeof price === 'number' &&
      location &&
      typeof location === 'string' &&
      req.file &&
      ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)
    ) {
      const ad = await Ad.findOne({ _id: req.params.id, user: user.id });

      if (ad) {
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
              user: user.id,
            },
          },
          { new: true }
        );
        res.status(201).json({ message: 'Ad Successfully Updated!' });
      } else {
        fs.unlinkSync(req.file.path);
        res.status(403).json({ message: 'Forbidden Action!' });
      }
    } else {
      fs.unlinkSync(req.file.path);
      res.status(400).json({ message: 'Bad Request!' });
    }
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
