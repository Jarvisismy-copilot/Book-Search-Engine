const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');

module.exports = (req, res, next) => {
  const token = req.headers.authorization || '';

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    } catch (err) {
      throw new AuthenticationError('Invalid or expired token');
    }
  }

  next();
};
