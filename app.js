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
    partialsDir: __dirname + '/views/partials/',
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
    // Add headers para permitir conectar con apps externas
app.use(function(req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
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