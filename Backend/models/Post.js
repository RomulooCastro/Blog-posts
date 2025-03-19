const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db'); // Supondo que você tenha uma instância do sequelize no arquivo db.js

const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,  // Adiciona automaticamente createdAt e updatedAt
});

module.exports = Post;
