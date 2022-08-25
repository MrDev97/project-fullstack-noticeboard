// initialize server
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const helmet = require('helmet');
const session = require('express-session');
const shortid = require('shortid');
const MongoStore = require('connect-mongo');

// import additional packages
const path = require('path');
const cors = require('cors');

// import endpoints
const usersRoutes = require('./routes/users.routes');
const adsRoutes = require('./routes/ads.routes');
const authRoutes = require('./routes/auth.routes');

// use additional packages
app.use(
  cors({
    origin: ['http://localhost:8000', 'http://localhost:3000'],
  })
);

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(helmet());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

// use endpoints
app.use('/api', usersRoutes);
app.use('/api', adsRoutes);
app.use('/api', authRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).send('404 You shall not pass!');
});

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

app.use(
  session({
    secret: shortid.generate(),
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: dbUri,
    }),
  })
);

const server = app.listen(process.env.PORT || 8000, () => {
  if (NODE_ENV !== 'test') {
    console.log('Server is running on port: 8000');
  }
});

module.exports = server;
