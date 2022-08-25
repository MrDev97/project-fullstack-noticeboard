const mongoose = require('mongoose');

const connectToDB = () => {
  const NODE_ENV = process.env.NODE_ENV;
  const MONGODB_USERNAME = process.env.MONGODB_USERNAME;
  const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
  const dbConnectionURL = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@noticeboarddb.y1yzwgp.mongodb.net/NoticeBoardDB`;

  let dbUri = '';

  if (NODE_ENV === 'production') dbUri = dbConnectionURL;
  else if (NODE_ENV === 'test')
    dbUri = 'mongodb://localhost:27017/NoticeBoardDBtest';
  else dbUri = dbConnectionURL;

  // connects our backend code with the database based on Node environment
  mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = mongoose.connection;

  db.once('open', () => {
    if (NODE_ENV !== 'test') {
      console.log('Connected to the database');
    }
  });
  db.on('error', (err) => console.log('Error ' + err));
};

module.exports = connectToDB;
