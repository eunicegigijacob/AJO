const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check jsonwebtoken exists and verify

  if (token) {
    jwt.verify(token, process.env.SECRETE_KEY, (err, decoded) => {
      if (err) {
        console.log(err);
        res
          .status(400)
          .json({ message: 'redirect to login, this is a protected page' });
      } else {
        console.log(decoded);
        next();
      }
    });
  } else {
    res
      .status(400)
      .json({ message: 'redirect to login, this is a protected page' });
  }
};

module.exports = { requireAuth };
