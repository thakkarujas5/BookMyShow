const { Sequelize } = require('sequelize');
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Movie = require('./movie')
const Theatre = require('./theatre')


const Timing = sequelize.define('timing', {
    timing_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    start_time: {
      type: Sequelize.TIME,
      allowNull: false
    },
    end_time: {
      type: Sequelize.TIME,
      allowNull: false
    },
    movie_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Movie,
        key: 'movie_id'
      }
    },
    theatre_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Theatre,
        key: 'theatre_id'
      }
    }
  });

module.exports = Timing;