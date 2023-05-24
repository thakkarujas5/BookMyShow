const express = require('express')
const bodyparser = require('body-parser');
const setup = require('./setup').setup;
const auth = require('./setup').auth
const Theatre = require('./models/theatre')
const Movie = require('./models/movie')
const Timing = require('./models/timing')
const sequelize = require('./db')

const app = express()

app.use(bodyparser.json())

function isValidDate(dateString) {
    const date = new Date(dateString);
  
    // Check if the date object is valid
    if (Object.prototype.toString.call(date) === "[object Date]") {
      // Valid date
      if (!isNaN(date.getTime())) {
        // Date is not NaN, which means it's a valid date
        return true;
      }
    }
  
    // Invalid date
    return false;
  }

app.get('/sync', (req, res) => {

    sequelize.sync()
        .then(() => {
            console.log('Tables created successfully.');
        })
        .catch((error) => {
            console.error('Error creating tables:', error);
        });
    
    return res.send('Tables Created Successfully');
})


app.get('/query/:theatreName', (req, res) => {


    if(!isValidDate(req.body.date)){

        res.status(400).send('Invalid Date format passed')
    }
    const theatreName = req.params.theatreName;

    const date = new Date(req.body.date);
    const dateString = date.toISOString().split('T')[0];



    const sq = 'Select t.theatre_name,m.movie_id, v.movie_name, m.start_time, m.end_time from theatres t inner join timings m on t.theatre_id=m.theatre_id inner join movies v on m.movie_id=v.movie_id where t.theatre_name=:theatreName and v.movie_expires >= :inter';

    sequelize.query(sq, {
            replacements: {
                theatreName: theatreName,
                inter: dateString
            },
            type: sequelize.QueryTypes.SELECT
        })
        .then(results => {
            // Access the query results here
            console.log(results);
            return res.json(results)
        })
        .catch(error => {
            // Handle any errors that occur during the query
            console.error(error);
        });

});


app.get('/', (req, res) => {
    res.send('Hello World')
})


app.get('/insert', (req, res) => {

    Theatre.bulkCreate([{
            theatre_name: 'Theatre1'
        },
        {
            theatre_name: 'Theatre2'
        },
        {
            theatre_name: 'Theatre3'
        },
        {
            theatre_name: 'Theatre4'
        },
        {
            theatre_name: 'Theatre5'
        }
    ])

    Movie.bulkCreate([{
            movie_name: 'Movie 1001',
            movie_expires: '2023-5-25'
        },
        {
            movie_name: 'Movie 1011',
            movie_expires: '2023-5-25'
        },
        {
            movie_name: 'Movie 1021',
            movie_expires: '2023-5-25'
        },
        {
            movie_name: 'Movie 1031',
            movie_expires: '2023-5-25'
        },
        {
            movie_name: 'Movie 1041',
            movie_expires: '2023-5-25'
        }
    ])

    Timing.bulkCreate([{
            start_time: '1:00:00',
            end_time: '2:00:00',
            movie_id: 2,
            theatre_id: 1
        },
        {
            start_time: '2:00:00',
            end_time: '3:00:00',
            movie_id: 3,
            theatre_id: 1
        },
        {
            start_time: '3:00:00',
            end_time: '4:00:00',
            movie_id: 4,
            theatre_id: 1
        },
        {
            start_time: '4:00:00',
            end_time: '5:00:00',
            movie_id: 5,
            theatre_id: 1
        }
    ])

    res.send('Values Inserted Sucesfully');
})


app.listen(5001, () => {

    console.log('Server started');
    setup();
    auth()
})