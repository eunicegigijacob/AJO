const { Customer } = require('../models/Customer.model');
const { customerServices } = require('../services/customer');
const { handleErrors } = require('../utils/errorHandler');
const { forgetPassword } = require('../utils/forgetpassword.util');
const { createToken, verifyResetToken } = require('../utils/token.utils');
const dotenv = require('dotenv');
const validator = require('validator');

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
        data: 'Reset password link has been sent to your email',
      });
    } catch (error) {
      const errors = handleErrors(error);

      res.status(200).json({ errors });
    }
  },

  renderResetPasswordPage: async (req, res) => {
    const { id, token } = req.params;

    const user = await customerServices.findCustomerById(id);
    if (!user) {
      res.json({ Error: 'Invalid Id' });
    }
    try {
      const payload = verifyResetToken(token, user.password);
      res.render('reset-password');
    } catch (error) {
      res.json({ error });
    }
  },

  resetPassword: async (req, res) => {
    const { id, token } = req.params;
    const { password, password2 } = req.body;
    const user = await customerServices.findCustomerById(id);
    if (!user) {
      res.json({ Error: 'Invalid Id' });
    }
    try {
      const payload = verifyResetToken(token, user.password);

      // validate password and password2 matches
      if (!validator.equals(password, password2)) {
        throw Error('Both passwords do not match');
      }

      user.password = password;
      await user.save();
      res.json({
        message: 'Sucessfully changed password, return to login page.',
      });
    } catch (error) {
      const errors = handleErrors(error);
      res.json({ errors });
    }
  },
};

module.exports = { AuthControls };
