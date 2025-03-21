const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: Process.env.JWT_EXPIRE,
  });
};

module.exports = generateToken;