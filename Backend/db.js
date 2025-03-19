const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('db', 'host', 'senha', {
  host: 'xxx',
  dialect: 'mysql',
});

module.exports = sequelize;
