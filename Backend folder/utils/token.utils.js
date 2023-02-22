const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const createToken = {
  loginToken: (data) => {
    return jwt.sign({ data }, process.env.SECRETE_KEY, { expiresIn: '15m' });
  },
};

module.exports = { createToken };
