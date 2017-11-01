const express = require('express');
const hbs = require('hbs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname + '/testserver'));

hbs.registerHelper('screamIt',(text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs',{
    pageTitle: 'Welcome to this Website',
    welcomeMessage:'Welcome home'
  });
});


app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'Welcome to the about page',
    currentYear: new Date().getFullYear
  });
});

app.get('/bad', (req, res) => {
  res.send({
    error: '404',
    message: [
      'Unable to fetch that server '
    ]
      });
});

app.listen(3000,() => {
  console.log('server 3000 port is up');
});
