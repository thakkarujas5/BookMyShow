const Timing = require('./models/timing')
const Theatre = require('./models/theatre')
const Movie = require('./models/movie')
const {
    Sequelize
} = require('sequelize');
const {
    DataTypes
} = require('sequelize');

const sequelize = require('./db')

async function auth() {

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {

        console.error('Unable to connect to the database:', error);
    }
}

function setup() {

    Movie.hasMany(Timing, {
        foreignKey: 'movie_id'
    });
    Timing.belongsTo(Movie, {
        foreignKey: 'movie_id'
    });
    Theatre.hasMany(Timing, {
        foreignKey: 'theatre_id'
    });
    Timing.belongsTo(Theatre, {
        foreignKey: 'theatre_id'
    }); 

}

module.exports = {setup,auth};