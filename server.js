const express = require('express');       // We need the express library
const hbs = require('hbs');
const fs = require('fs');

// Create a new Express Application
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use( (req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// app.use( (req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

// Setup our first default HTTP route handlers.
// This route directly binds to the root folder,
// We just send a simple string back for now
app.get('/', (request, response) => {
  response.render('home.hbs', {
    pageTitle: 'About Page',
    welcomeMessage: 'Welcome to my website!'
  });
});

app.get('/about', (request, response) => {
  response.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (request, response) => {
  response.send( {
    errorMessage: 'Unable to handle request'
  });
});

// Bind our application to port 3000,
// and let the user know the server is up and running
app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});