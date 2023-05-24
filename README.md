## API's

###  GET '/sync'

This route is responsible for the DB migrations, this is the first route that we fire up when we run the project.

###  GET '/insert'

This route inserts all the temporary data in the database.

###  GET '/query/:TheatreName'

This route based on the theatrename gets all the movies that are running in that particular theatre and the timings of the movie associated with that movie.