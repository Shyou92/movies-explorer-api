const config = {
  JWT_SECRET: process.env.JWT_SECRET || 'verySecretKey',
  APP_PORT: process.env.APP_PORT,
};

module.exports = config;
