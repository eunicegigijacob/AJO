const express = require('express');

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json('Server up!');
});

app.get('*', (req, res) => {
  res.status(404).json('PAGE NOT FOUND');
});

module.exports = { app };
