'use strict'

const express= require('express');
const api= express.Router();
var multiparty= require('connect-multiparty');
var md_upload= multiparty({uploadDir: './public/uploads/productos'});
const mailControllers= require('../controllers/mailControllers');
const dbControllers= require('../controllers/dbControllers');
const edicionControllers= require('../controllers/edicionControllers');
const userControllers= require('../controllers/userControllers');

//Cruds para peliculas

//rutas de páginas
api.get('/index2', (req, res)=>{
	res.render('index-rec');
});

api.get('/productos', (req, res)=>{
	res.render('productos');
});
// BUSQUEDAS
api.get('/verconcidencia', (req, res)=>{
	res.render('busqueda');
});
api.post('/coincidenciaadmin', dbControllers.postProductosCoincidenciaadmin);
api.post('/coincidencia', dbControllers.postProductosCoincidencia);


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

api.get('/edicion', (req, res)=>{
	res.render('admin_imagenes');
});

/////

//////

api.post('/upload',(req,res) => {
    let EDFile = req.files.picture
    EDFile.mv(`./public/imagenes/banner3.png`,err => {
        if(err) return res.status(500).send({ message : err })
		res.status(200).render('index');
	})
})

api.post('/upload_banner',(req,res) => {
	let EDFile = req.files.picture;
	var id_imagen= req.body.seleccion;
    EDFile.mv('./public/imagenes/banner'+id_imagen+'.jpg',err => {
        if(err) return res.status(500).send({ message : err })
		res.status(200).render('admin');
	})
})

api.post('/upload_productos',(req,res) => {
	let EDFile = req.files.picture
	var id_imagen= req.body.id_imagen
	// console.log(req.files.picture.values)
	// console.log(id_imagen)
    EDFile.mv('./public/imagenes/'+id_imagen+'.png',err => {
        if(err) return res.status(500).send({ message : err })
		res.status(200).render('admin');
	})
})
api.post('/postmail_contacto', mailControllers.postMail2);
api.post('/postmail_cotizacion', mailControllers.postMail);

api.get('/portatiles', dbControllers.getPortaStock);

api.get('/redes', dbControllers.getRoutersTplink);
api.get('/cases', dbControllers.getCases);
api.get('/seguridad-2', dbControllers.getSeguridad);
api.get('/impresoras', dbControllers.getImpresoras);
//api.get('/imagen',('./controllers/publick/img3.jpg.'));

//obtener usuarios
api.get('/getusuarios', userControllers.getUsuarios);
//Vista de inicio de sesion
api.get('/signin', (req, res)=>{
	res.render('signin');
});
//administrador
api.get('/adminClickhere', (req, res)=>{
	res.render('admin');
});
//Enviar usuario por post
api.post('/postsignin', userControllers.postUsuario);
module.exports= api
