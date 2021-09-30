const express = require('express');
    morgan = require('morgan'),
    bodyParser = require('body parser'),
    uuid = require('uuid'),
    mongoose = require('mongoose'),
    models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;
const Directors = Models.Director;
const Genre = Models.Genre;

mongoose.connect('mongodb://localhost:27017/[LGBTQMovieApp]', { 
useNewUrlParser: true,
useUnifiedTopology: true,
});

const app = express(); 

// Logging Middleware
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Static Files
app.use(express.static('public'));

// GET requests
// Get All Movies
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

app.get('/', (req, res) => {
    res.send('Welcome to My Movie App')
});

// Add a new movie
app.post('/movies', (req, res) => {
    console.log('body: ', req.body);
    Movies.findOne({ Title: req.body.Title })
        .then(movie => {
            if (movie) {
                return res.status(400).send(req.body.Title + 'already exists');
            } else {
                Movies.create({
                    Title: req.body.Title,
                    Description: req.body.Description,
                    Genre: {
                        Name: req.body.Genre.Name
                    },
                    Director: {
                        Name: req.body.Director.Name,
                        Bio: req.body.Director.Bio
                    },
                    Actors: req.body.Actors,
                    ImagePath: req.body.ImagePath
                })
                .then(movie => {
                    res.status(201).json(movie);
                })
                .catch(error => {
                    console.error(error);
                    res.status(500).send('Error: ' + err);
                });
            }
            })
        .catch(error => {
            console.error(error);
            res.status(500).send('Error: ' + err);
        });
});

// Get a Movie by Title
app.get('/movies/:Title', (req, res) => {
    res.send( 'Success GET request containing an ID, title,genre, director property');
});


app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', {root: _dirname});
});

app.get('/movies/:Title/Genre', (req, res) => {
    res.send('Successful GET request containing data about a genre(description) by name/title');
});

app.get('/movies/:Title/Director', (req, res) => {
    res.send('Successful GET request containing data about a director(bio, birth year, death year) by name');
});

// Get all Users
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

// Get a User by Username
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

// app.post('/users', (req, res) => {
//     res.send('Successful POST request containing data about about the user being added');
// });

// Add a user
/*We'll expect JSON in this format
{
    ID: integer,
    Username: String,
    Password: String,
    Email: String,
    Birthday: Date
}*/
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

// Update a user's info, by username
/* We'll expect JSON in this format
{
    Username: String, (required)
    Password: String, (required)
    Email: String, (required)
    Birthday: String, (required)
} */
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

// Add a movie to a user's list of favorites
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

//  Delete a user by username
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

// app.put('/users/:Name', (req, res) => {
//     res.send('Successful PUT request adding data about the user being added');
// })

// app.post('/users/:Name/Movies/:MovieID', (req, res) => {
//     res.send('Successful Post result allowing new users to add a movie to their list of favorites');
// });

// app.delete('/users/:Name/movies/:MovieID', (req, res) => {
//     res.send('Successful Delete request allowing users to remove a movie from their list of favorites');
// });

// app.delete('/users/:UserID', (req, res) => {
//     res.send('Successful Delete request allowing users to delete their profile');
// });

// app.get('/secreturl', (req, res) =>{
//     res.send('This is a secret URL');
// });


    
// app.use(methodOverride());

let Movies = [
    {
        title: 'Movie One',
        actor: 'Actor One',
    },
    {
        title: 'Movie Two',
        actor: 'Actor Two',
    }, {
        title: 'Movie Three',
        actor: 'Actor Three',
    },
    {
        title: 'Movie Four',
        actor: 'Actor Four',
    },
    {
        title: 'Movie Five',
        actor: 'Actor Five',
    },
    {
        title: 'Movie Six',
        actor: 'Actor Six',
    },
    {
        title: 'Movie Seven',
        actor: 'Actor Seven',
    },
    {
        title: 'Movie Eight',
        actor: 'Actor Eight',
    },
    {
        title: 'Movie Nine',
        actor: 'Actor Nine',
    },
    {
        title: 'Movie Ten',
        actor: 'Actor Ten',
    },
];


// Error Handler
app.use((err, req, res, next) => {
    console.error(err,stack);
    res.status(500).send('Something Broke');
});

// Listen to requests
app.listen(8080, function(req, res){
    console.log('Movie App is Running on Port 8080...')
})

// mongoose Querying functions
// mongoose.model.deleteMany()
// mongoose.model.deleteOne()
// mongoose.model.find()
// mongoose.model.findById()
// mongoose.model.findByIdAndDelete()
// mongoose.model.findByIdAndRemove()
// mongoose.model.findByIdandUpdate()
// mongoose.model.findOne()
// mongoose.model.findOneAndDelete()
// mongoose.model.fineOneAndRemove()
// mongoose.model.findOneAndUpdate()
// mongoose.model.replaceOne()
// mongoose.model.updateMany()
// mongoose.model.updateOne()
