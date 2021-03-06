const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();


const port = process.env.PORT || 8888;
//Set View enginee
hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');


//all public files will be sent when request some for that like http://localhost:8888/about.html
app.use(express.static(__dirname+'/public'));

//Custom MiddleWare
app.use( (req,res,next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} : ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log +'\n', (err) => console.log('unable to log: ',err) );
    next();
});

// app.use( (req,res,next) => {
//     res.render('mentainance.hbs');
// });


hbs.registerHelper('getCurrentyear', () => new Date().getFullYear());
hbs.registerHelper('screamIT', (text) =>  text.toUpperCase() );

app.get('/' , (req,res) => {
    res.render('home.hbs',{
        welcomeMessage:'Welcome to our website',
        pageTitle:'Home Page'
    })
})

app.get('/projects', (req,res) => {
    res.render('projects.hbs', { 
        pageTitle:'Project Page'
    });
});
app.get('/about', (req,res) => {
    res.render('about.hbs', { 
        pageTitle:'About Page'
    });
});
app.listen(port, () => {
    console.log('server is up on port '+ port);
});