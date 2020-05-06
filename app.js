'use strict'

const express = require('express');
const bodyParser = require('body-parser')
const app = express()
const hbs = require('express-handlebars')
const formidable = require('express-form-data')
var path = require('path');
const fileUpload = require('express-fileupload')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(fileUpload())
const api = require('./routes')
var session = require('express-session');


app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}))

app.use(express.static(path.join(__dirname, 'public')));
app.engine('.hbs', hbs({
    defaultLayout: 'default',
    extname: '.hbs',
    helpers: {
        decimal: function(number) {
            return (number).toFixed(2);
        },
        division: function(cantidad, total) {
            return (total / cantidad).toFixed(2)
        }

    }
}))

app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});

app.set('view engine', '.hbs')

app.use('/api', api)
    // app.get('/login', (req, res)=>{
    // 	res.render('login')
    // })
app.get('/', (req, res) => {
    res.render('index')
})
app.get('/juego', (req, res) => {
    res.render('juego')
});


app.use(formidable.parse({ keepExtensions: true }));

app.get('*', (req, res) => {
    res.render('404');
});
module.exports = app