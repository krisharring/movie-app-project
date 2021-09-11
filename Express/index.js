const express = require('express');
    morgan = require('morgan');

    app.use(morgan('common'));

const app = express();

// error handling
const bodyParser = require('body-parser'),
    methodOverride = require('method-override');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(methodOverride());

app.use((err, req, res, next) => {
    console.error(err,stack);
    res.status(500).send('Something Broke');
});



// GET requests
app.get('/', (req, res) => {
    res.send('Welcome to My Movie App')
});

app.get('/secreturl', (req, res) =>{
    res.send('This is a secret URL')
});


// Middleware function orders
//Logging, User Authentification, App Routing

// Listen to requests
app.listen(8080, () =>{
    console.log('Your app is listening to post 8080')
});