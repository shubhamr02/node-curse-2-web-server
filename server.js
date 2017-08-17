const express = require('express');
const hbs = require('hbs');  //handlebars
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials') // registerPartials provides a quick way to load all partials from a specific directory:
              //partials allows us to use files anywhere
app.set('view engine','hbs'); //handlebars property
//using middleware
//app.use(express.static(__dirname +'/public'));

//Using express middleware

app.use((req, res, next) => {
  var now = new Date().toString();

  var log = `${now}: ${req.method}: ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err)
    {
        console.log('Unable to fetch the log files');
    }
  });
  next();
});
/*
app.use((req, res, next) => {
  res.render('maintenace.hbs'); // Express middleware works in order the way you execute the code
});
*/
app.use(express.static(__dirname +'/public'));

hbs.registerHelper('getCurrentYear',() => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text) => {
  return text.toUpperCase();
});

app.get('/',(req, res) => {
  //res.send('<h1>Hello express!</h1>');
  /*
  res.send({
    name: 'Shubham Rahate',
    likes: [
      'Travelling',
      'Learning',
      'coding'
    ]
    */
    res.render('home.hbs', {
      pageTitle: 'Welcome Home',
      welcomeMessage: 'Welcome to my website',
      //currentYear: new Date().getFullYear()

  });
});

app.get('/about',(req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    //currentYear: new Date().getFullYear()
  });   //render lets you render any html file in any directory
});

app.get('/bad',(req, res) => {
  res.send({
    error: '404',
    Message: [
      'Unable to connect to the server .'
    ]
  });
});

app.listen(3000,() => {
  console.log('server on port 3000 is up')
});
