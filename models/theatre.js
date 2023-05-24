const { Sequelize } = require('sequelize');
const { DataTypes } = require('sequelize');
const sequelize = require('../db');


const Theatre = sequelize.define('theatre', {
    theatre_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    theatre_name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

module.exports = Theatre