const express = require('express');

const app = express(); 


// // error handling - body parser depreceated
bodyParser = require('body-parser');
const morgan = require('morgan');

// // GET requests

app.get('/', (req, res)=> {
    res.send('Welcome to My Movie App')
});

app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', {root: _dirname});
});

app.get('/movies', function(req, res) {
    res.send('Successful GET request returning data of all Movies');
});

app.get('/movies/:Title', (req, res) => {
    res.send( 'Success GET request containing an ID, title,genre, director property');
});

app.get('/movies/:Title/Genre', (req, res) => {
    res.send('Successful GET request containing data about a genre(description) by name/title');
});

app.get('/movies/:Title/Director', (req, res) => {
    res.send('Successful GET request containing data about a director(bio, birth year, death year) by name');
});

app.post('/users', (req, res) => {
    res.send('Successful POST request containing data about about the user being added');
});

app.put('/users/:Name', (req, res) => {
    res.send('Successful PUT request adding data about the user being added');
})

app.post('/users/:Name/Movies/:MovieID', (req, res) => {
    res.send('Successful Post result allowing new users to add a movie to their list of favorites');
});

app.delete('/users/:Name/movies/:MovieID', (req, res) => {
    res.send('Successful Delete request allowing users to remove a movie from their list of favorites');
});

app.delete('/users/:UserID', (req, res) => {
    res.send('Successful Delete request allowing users to delete their profile');
});

app.get('/secreturl', (req, res) =>{
    res.send('This is a secret URL');
});

    // Logging Middleware
    app.use(express.json());
    app.use(express.urlencoded({entended: true}));
    app.use(morgan('common'));
    // Static Files
    app.use(express.static('public'));
    
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
