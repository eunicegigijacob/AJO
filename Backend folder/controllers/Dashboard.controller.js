const { customerServices } = require('../services/customer');

const dashboardConstrols = {
  home: async (req, res) => {
    const customerId = req.decoded.data;
    const customer = await customerServices.findCustomerById(customerId);
    res.json({
      name: customer.firstname,
      walletBalance: customer.walletBalance,
    });
  },
};

module.exports = { dashboardConstrols };
