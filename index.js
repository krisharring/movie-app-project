// required Modules
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body parser');
const uuid = require('uuid'),

// importing Models
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;
const Directors = Models.Director;
const Genre = Models.Genre;

mongoose.connect('mongodb://localhost:27017/[LGBTQMovieApp]', { 
useNewUrlParser: true,
useUnifiedTopology: true,
});

// express
const app = express(); 

// morgan
app.use(morgan('common'));

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// passport for authentication
let auth = require('./auth')(app);
const passport = require('passport');
require('./passport');


// GET requests
// welcome page
app.get('/', (req, res) => {
    res.send('Welcome to My Movie App')
});

// get all movies
app.get('/movies', (req, res) => {
    Movies.find()
        .then(movies => {
            res.status(201).json(movies);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
    }
);

// get a movie by title
app.get('/movies/:Title', passport.authenticate('jwt', {session:false}), (req, res) => {
    Movies.findOne({Title: req.params.Title})
    .then((movie) => {
        res.json(movie);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

// get a list of all genres
app.get('/genres', passport.authenticate('jwt', {session:false}), (req, res) => {
    Genre.find()
    .then((genres) => {
        res.status(201).json(genres);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error ' + err);
    });
});

// gets the description of all movie directors
app.get('/directors/:Name', passport.authenticate('jwt', {session:fale}), (req, res) => {
    Directors.findOne({Name: req.params.Name})
    .then((director) => {
        res.json(director);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

// get all users
app.get('/users', (req, res) => {
    Users.find()
        .then((users) => {
            res.status(201).json(users);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// allow new users to register
app.post('/users', (req, res) => {
    Users.findOne({ Username: req.body.Username})
        .then((user) => {
            if (user) {
                return res.status(400).send(req.body.UserName + 'already exists');
            } else {
                Users
                    .create({
                        Username: req.body.Username,
                        Password: req.body.Password,
                        Email: req.body.Email,
                        Birthday: req.body.Birthday
                    })
                    .then((user) => {res.status(201).json(user) })
                .catch((error) => {
                    console.error(error);
                    res.status(500).send('Error: ' + error);
                })
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});

// get a user by username
app.get('/users/:Username', (req, res) => {
    Users.findOne({ Username: req.params.Username })
    .then((user) => {
        res.json(user);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', {root: _dirname});
});

// update a user by username
app.put('/users/:Username', (req, res) => {
    Users.findOneAndUpdate({Username: req.params.Username }, 
    { $set: 
    {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
    }
    },
    {new: true}, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
        if(err) {
            console.log(err);
            res.status(500).send('Error ' + err);
        } else {
            res.json(updatedUser);
        }
    });
});

// Allow a  user to add a movie to their favorite list
app.post('/users/:Username/movies/:MovieID', (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, {
        $push: { FavoriteMovies: req.params.MovieID }
    },
    { new: true}, // This line makes sure that the updated document is returned
    (err, updateUSer) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error: ' + err);
        } else {
            res.json(updatedUser);
        }
    });
});

// allow users to remove movies from favorite list
app.delete('/users/:Username/movies/:MovieID', (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, {
        $pull: { FavoriteMovies: req.params.MovieID }
    },
    { new: true}, // This line makes sure that the updated document is returned
    (err, updateUSer) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error: ' + err);
        } else {
            res.json(updatedUser);
        }
    });
});

//  delete a user by username
app.delete('/users/:Username', (req, res) => {
    Users.findOneandRemove({ Username: req.params.Username })
        .then((user) => {
            if(!user) {
                res.status(400).send(req.params.Username + ' was not found');
            } else {
                res.status(200).send(req.params.Username + ' was deleted.');
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});
    
// exposing files in 'public' folder
app.use(express.static('public'));


// Error Handler middleware
app.use((err, req, res, next) => {
    console.error(err,stack);
    res.status(500).send('Something Broke');
});

// Listen to requests
app.listen(8080, function(req, res){
    console.log('Movie App is Running on Port 8080...')
})
