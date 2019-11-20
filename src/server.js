const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const AuthController = require('./controllers/AuthController');
const BachelorController = require('./controllers/BachelorController');
const CourseController = require('./controllers/CourseController');
const SessionController = require('./controllers/SessionController');
const UserController = require('./controllers/UserController');
const cors = require('cors');
const {Notification} = require('./models/Notification');
const {User} = require('./models/User');

require('dotenv').config();
const app = express();

// apply middleware
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

// serve website
app.use(express.static(path.join(__dirname, '/../client/build')));

// api endpoints
app.use('/api/auth', AuthController);
app.use('/api/bachelors', BachelorController);
app.use('/api/courses', CourseController);
app.use('/api/sessions', SessionController);
app.use('/api/users', UserController);

// serve react in any other endpoint
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running at ${port}.`);

  // connect to mongo database
  mongoose.connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // connection callback
  mongoose.connection.once('open', async () => {
    console.log('Connected to mongo');
  });
});
