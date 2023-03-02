const { Customer } = require('../models/Customer.model');

const customerServices = {
  createCustomer: async (newUser) => {
    return await Customer.create(newUser);
  },
  findCustomerByEmail: async (email) => {
    return await Customer.findOne({ email });
  },

  findCustomerById: async (id) => {
    return await Customer.findById(id);
  },
};

module.exports = { customerServices };
