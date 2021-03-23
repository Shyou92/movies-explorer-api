const config = {
  JWT_SECRET: process.env.JWT_SECRET || 'verySecretKey',
  APP_PORT: parseInt(process.env.APP_PORT || 3000, 10),
};

module.exports = config;
