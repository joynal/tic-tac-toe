const path = require('path');

// import .env variables
require('dotenv-safe').config({
  path: path.join(__dirname, '../../.env'),
  sample: path.join(__dirname, '../../.env.example'),
});

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.NODE_ENV === 'test' ? process.env.TEST_PORT : process.env.PORT,
  secret: process.env.SECRET,
  dbUri: process.env.NODE_ENV === 'test' ? process.env.TEST_DB_URI : process.env.MONGO_URI,
  frontendHost: process.env.FRONTEND_HOST,
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
};
