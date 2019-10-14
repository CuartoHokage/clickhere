'use strict'

const express= require('express');
const api= express.Router()

const mailControllers= require('../controllers/mailControllers');
const dbControllers= require('../controllers/dbControllers');
//Cruds para peliculas

//rutas de páginas
api.get('/productos', (req, res)=>{
	res.render('productos');
});
api.get('/contacto', (req, res)=>{
	res.render('contacto');
});

api.get('/mantenimiento', (req, res)=>{
	res.render('mantenimiento');
});
api.get('/seguridad', (req, res)=>{
	res.render('seguridad');
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
api.get('/productos', (req, res)=>{
	res.render('productos');
});

api.post('/postmail_cotizacion', mailControllers.postMail);

api.get('/getproductos', dbControllers.getProductos)
module.exports= api
