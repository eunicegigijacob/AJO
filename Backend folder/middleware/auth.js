const jwt = require('jsonwebtoken');

const authMiddlewares = {
  verifyLoginToken: (req, res, next) => {
    const token = req.cookies.jwt;

    // check if token exists and verify
    if (token) {
      jwt.verify(token, process.env.SECRETE_KEY, (err, decoded) => {
        if (err) {
          console.log(err);
          res.status(400).json({ message: 'Invalid Token' });
        } else {
          console.log(decoded);
          next();
        }
      });
    } else {
      res.status(400).json({ message: 'this is a protected page' });
    }
  },
};

module.exports = {};
