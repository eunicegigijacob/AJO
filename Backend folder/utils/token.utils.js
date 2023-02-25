const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const createToken = {
  loginToken: (data) => {
    return jwt.sign({ data }, process.env.SECRETE_KEY, { expiresIn: '1hr' });
  },
  passwordResetToken: (data, password) => {
    const secrete = process.env.SECRETE_KEY + password;
    return jwt.sign({ data }, secrete, { expiresIn: '3m' });
  },
};

module.exports = { createToken };
