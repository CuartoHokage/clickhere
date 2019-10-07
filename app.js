'use strict'

const express = require ('express');
const bodyParser= require('body-parser')
const app= express()
const hbs= require('express-handlebars')
const formidable=require('express-form-data')
var path = require('path');
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
const api= require('./routes')
app.use(express.static(path.join(__dirname, 'public')));
app.engine('.hbs', hbs({
	defaultLayout: 'default',
	extname: '.hbs'
}))

app.set('view engine', '.hbs')

app.use('/api', api)
// app.get('/login', (req, res)=>{
// 	res.render('login')
// })
app.get('/', (req, res)=>{
	res.render('index')
})
app.get('/juego', (req, res)=>{
	res.render('juego')
});

app.use(formidable.parse({keepExtensions:true}));
module.exports=app