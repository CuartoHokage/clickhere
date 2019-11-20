'use strict'

const express = require('express');
const api = express.Router();
var multiparty = require('connect-multiparty');
var md_upload = multiparty({ uploadDir: './public/uploads/productos' });
const mailControllers = require('../controllers/mailControllers');
const dbControllers = require('../controllers/dbControllers');
const edicionControllers = require('../controllers/edicionControllers');
const userControllers = require('../controllers/userControllers');
const Cart = require('../models/cart');

//Cruds para peliculas

//rutas de páginas
api.get('/index2', (req, res) => {
	res.render('index-rec');
});

api.get('/productos', (req, res) => {
	res.render('productos');
});
// BUSQUEDAS
api.get('/verconcidencia', (req, res) => {
	res.render('busqueda');
});
api.post('/coincidenciaadmin', dbControllers.postProductosCoincidenciaadmin);
api.post('/coincidencia', dbControllers.postProductosCoincidencia);


api.get('/contacto', (req, res) => {
	res.render('contacto');
});

api.get('/mantenimiento', (req, res) => {
	res.render('mantenimiento');
});
api.get('/seguridad', (req, res) => {
	res.render('seguridad');
});
api.get('/acerca_de', (req, res) => {
	res.render('acerca_de');
});
api.get('/portafolio', (req, res) => {
	res.render('portafolio');
});
api.get('/construccion', (req, res) => {
	res.render('en_creacion');
});
api.get('/cotizacion', (req, res) => {
	res.render('cotizacion');
});
api.get('/productos', (req, res) => {
	res.render('productos');
});

api.get('/edicion', (req, res) => {
	res.render('admin_imagenes');
});

/////

//////

api.post('/upload', (req, res) => {
	let EDFile = req.files.picture
	EDFile.mv(`./public/imagenes/banner3.png`, err => {
		if (err) return res.status(500).send({ message: err })
		res.status(200).render('index');
	})
})

api.post('/upload_banner', (req, res) => {
	let EDFile = req.files.picture;
	var id_imagen = req.body.seleccion;
	EDFile.mv('./public/imagenes/banner' + id_imagen + '.jpg', err => {
		if (err) return res.status(500).send({ message: err })
		res.status(200).render('admin');
	})
})

api.post('/upload_productos', (req, res) => {
	let EDFile = req.files.picture
	var id_imagen = req.body.id_imagen
	// console.log(req.files.picture.values)
	// console.log(id_imagen)
	EDFile.mv('./public/imagenes/' + id_imagen + '.png', err => {
		if (err) return res.status(500).send({ message: err })
		res.status(200).render('admin');
	})
})
api.post('/postmail_contacto', mailControllers.postMail2);
api.post('/postmail_cotizacion', mailControllers.postMail);

api.get('/portatiles', dbControllers.getPortaStock);
api.get('/portatiless', dbControllers.getPortaStocks);

api.get('/redes', dbControllers.getRoutersTplink);
api.get('/cases', dbControllers.getCases);
api.get('/seguridad-2', dbControllers.getSeguridad);
api.get('/impresoras', dbControllers.getImpresoras);
//api.get('/imagen',('./controllers/publick/img3.jpg.'));

//obtener usuarios
api.get('/getusuarios', userControllers.getUsuarios);
//Vista de inicio de sesion
api.get('/signin', (req, res) => {
	res.render('signin');
});
//administrador
api.get('/adminClickhere', (req, res) => {
	res.render('admin');
});
//Enviar usuario por post
api.post('/postsignin', userControllers.postUsuario);
module.exports = api

// var products;
// $.ajax({
// 	url: '/api/portatiless',
// 	dataType: 'JSON',
// 	type: 'GET'
//   }).done(function() {
// 	 console.log(response);
//   });


//funciones carrito
api.get('/add/:id', function (req, res, next) {
	console.log(Cartss)
	var Cartss= [
		{
		  "id": 15085,
		  "title": "Apples",
		  "description": "Apples are <span class=\"label label-info\">25 CHF each</span>",
		  "price": 25
		},
		{
		  "id": 2,
		  "title": "Oranges",
		  "description": "Oranges are <span class=\"label label-info\">30 CHF each</span>",
		  "price": 30
		},
		{
		  "id": 3,
		  "title": "Garlic",
		  "description": "Garlic are <span class=\"label label-info\">15 CHF each</span>",
		  "price": 15
		},
		{
		  "id": 4,
		  "title": "Papayas",
		  "description": "Papayas are <span class=\"label label-info\">50 CHF each</span>, but are <span class=\"label label-warning\">available as 3 for the price of 2</span>",
		  "price": 100
		}
	  ]
	  
	var productId = req.params.id;
	console.log(productId);
	var cart = new Cart(req.session.cart ? req.session.cart : {});
	var product = Cartss.filter(function (item) {
		return item.id == productId;
	});
	cart.add(product[0], productId);
	req.session.cart = cart;
	res.redirect('/api/portatiles');
});