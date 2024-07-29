const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('birthday_api', 'user', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;

