const { Customer } = require('../models/Customer.model');
const { customerServices } = require('../services/customer');
const { handleErrors } = require('../utils/errorHandler');
const { forgetPassword } = require('../utils/forgetpassword.util');
const { createToken } = require('../utils/token.utils');
const dotenv = require('dotenv');

dotenv.config();

const AuthControls = {
  signup: async (req, res) => {
    const { firstname, lastname, phoneNumber, invitecode, email, password } =
      req.body;
    console.log(firstname, lastname, phoneNumber, invitecode, email, password);

    try {
      const newCustomer = await customerServices.createCustomer({
        firstname,
        lastname,
        phoneNumber,
        email,
        password,
        invitecode,
      });
      res.status(200).json({ data: newCustomer._id });
    } catch (error) {
      const errors = handleErrors(error);
      res.status(400).json({ errors });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json('Please enter your email and password');
    }
    try {
      const customer = await Customer.login(email, password);
      const token = createToken.loginToken(customer._id);
      res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 2,
      });
      res.status(200).json({ user: customer._id });
    } catch (error) {
      const errors = handleErrors(error);
      res.status(400).json({ errors });
    }
  },

  forgetPassword: async (req, res) => {
    const { email } = req.body;
    const host = req.get('host');
    const url = `${req.protocol}://${host}/api/v1/auth/reset-password`;

    try {
      await forgetPassword(email, url, process.env.SENDER_EMAIL);

      res.status(200).json({
        status: 'successfull',
        data: 'Reset password link has been sent',
      });
    } catch (error) {
      const errors = handleErrors(error);

      res.status(200).json({ errors });
    }
  },
};

module.exports = { AuthControls };
