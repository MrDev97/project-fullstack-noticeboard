// initialize server
const express = require('express');
const app = express();
const connectToDB = require('./db');
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

const NODE_ENV = process.env.NODE_ENV;
const MONGODB_USERNAME = process.env.MONGODB_USERNAME;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const dbConnectionURL = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@noticeboarddb.y1yzwgp.mongodb.net/NoticeBoardDB`;

//connect to DB
connectToDB();

//add middleware
app.use(
  cors({
    origin: ['http://localhost:8000', 'http://localhost:3000'],
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(
  session({
    secret: shortid.generate(),
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: dbConnectionURL,
      collection: 'sessions',
    }),
  })
);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.static(path.join(__dirname, '/public')));

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

const server = app.listen(process.env.PORT || 8000, () => {
  if (NODE_ENV !== 'test') {
    console.log('Server is running on port: 8000');
  }
});

module.exports = server;
