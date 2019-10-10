'use strict'

const express= require('express');
const api= express.Router()

const mailControllers= require('../controllers/mailControllers')
//Cruds para peliculas

//rutas de páginas
api.get('/roucube', (req, res)=>{
	res.render('roucube');
});
api.get('/contacto', (req, res)=>{
	res.render('contacto');
});

api.get('/wordpress', (req, res)=>{
	res.render('wordpress');
});
api.get('/moodle', (req, res)=>{
	res.render('moodle');
});
api.get('/acerca_de', (req, res)=>{
	res.render('acerca_de');
});
api.get('/portafolio', (req, res)=>{
	res.render('portafolio');
});
api.get('/construccion', (req, res)=>{
	res.render('en_creacion');
});
api.get('/cotizacion', (req, res)=>{
	res.render('cotizacion');
});
api.post('/postmail_cotizacion', mailControllers.postMail);

module.exports= api
