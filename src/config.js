'use strict';
module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DB__URL: process.env.DB_URL || 'postgresql://movie@localhost/movie',
  JWT_SECRET: process.env.JWT_SECRET
};