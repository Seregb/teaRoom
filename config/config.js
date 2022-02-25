require('dotenv').config();
module.exports = {
  development: {
    username: 'taras',
    password: '12345',
    database: 'tearoom',
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
