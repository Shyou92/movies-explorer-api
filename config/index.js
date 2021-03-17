const config = {
  JWT_SECRET: process.env.JWT_SECRET || 'verySecretKey',
  APP_PORT: process.env.APP_PORT,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_NAME: process.env.DB_NAME,
};

module.exports = config;
