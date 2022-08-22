const mongoose = require('mongoose');
const { ObjectId } = require('mongoose');

const noticeSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 10, maxlength: 50 },
  description: { type: String, required: true, minlength: 20, maxlength: 1000 },
  date: { type: Date, required: true },
  image: { type: File, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  user: { type: ObjectId, required: true, ref: 'User' },
});

module.exports = mongoose.model('Notice', noticeSchema);
