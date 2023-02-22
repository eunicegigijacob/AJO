const { Customer } = require('../models/Customer.model');
const { customerServices } = require('../services/customer');
const { handleErrors } = require('../utils/errorHandler');
const { createToken } = require('../utils/token.utils');

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
    console.log(email, password);
    if (!email || !password) {
      res.status(400).json('Please enter your email and password');
    }
    try {
      const customer = await Customer.login(email, password);
      console.log(customer);
      //   const token = createToken.loginToken(customer._id);
      //   console.log(token);
      //   res.cookie('jwt', token, {
      //     httpOnly: true,
      //     maxAge: 1000 * 60 * 60 * 2,
      //   });
      res.status(200).json({ user: customer._id });
    } catch (error) {
      res.status(400).json({});
    }
  },
};

module.exports = { AuthControls };