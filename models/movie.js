const { Sequelize } = require('sequelize');
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Movie = sequelize.define('movie', {
    movie_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    movie_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    movie_expires: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: new Date()
    }
  });

module.exports = Movie;