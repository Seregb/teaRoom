require('dotenv').config();
module.exports = {
  development: {
    username: process.env.DB_USER,
    password: String(process.env.DB_PASS),
    database: process.env.DB_NAME,
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: 'taras',
    password: '12345',
    database: 'tearoom',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: 'taras',
    password: '12345',
    database: 'tearoom',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
};
