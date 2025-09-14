const jwt = require('jsonwebtoken');

exports.createTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });
  const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET_KEY, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE_TIME || '30d',
  });
  return { accessToken, refreshToken };
};
