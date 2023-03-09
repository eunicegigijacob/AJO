const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { routemanager } = require('./routes/routes');

const app = express();

app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      console.log(`Origin ${origin} is being granted CORS access`);
      callback(null, true);
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());

app.use('/', routemanager);

app.get('/health', (req, res) => {
  res.status(200).json('Server up!');
});

app.get('*', (req, res) => {
  res.status(404).json('PAGE NOT FOUND');
});

module.exports = { app };
