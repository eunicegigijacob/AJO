const { Customer } = require('../models/Customer.model');

const customerServices = {
  createCustomer: async (newUser) => {
    return await Customer.create(newUser);
  },
  findCustomerByEmail: async (email) => {
    return await Customer.findOne({ email });
  },
};

module.exports = { customerServices };
