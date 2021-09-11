const express = require('express');
    morgan = require('morgan');

    app.use(morgan('common'));

const app = express();

let topMovies = [
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

// GET requests
app.get('/', (req, res) => {
    res.send('Welcome to My Movie App')
});

app.get('/documentation', (req, res) => {
    res.sendFile('public.documentation.html', {root: _dirname});
});

app.get('/movies', (req, res) => {
    res.json(topMovies);
});

// Listen to requests
app.listen(8080, () =>{
    console.log('Your app is listening to post 8080')
});


// app.get('/secreturl', (req, res) =>{
//     res.send('This is a secret URL')
// });

// // error handling
// const bodyParser = require('body-parser'),
//     methodOverride = require('method-override');

// app.use(bodyParser.urlencoded({
//     extended: true
// }));

// app.use(bodyParser.json());
// app.use(methodOverride());

// app.use((err, req, res, next) => {
//     console.error(err,stack);
//     res.status(500).send('Something Broke');
// });






// Middleware function orders
//Logging, User Authentification, App Routing

