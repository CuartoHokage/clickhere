'use strict'
var os = require('os');
const fs = require('fs');
const path = require('path');
const Peliculas = require('../modelos/peliculas');
const nodemailer = require('nodemailer')

function postMail(req, res) {
	console.log('Post /api/mails')
	let peliculas = new Peliculas()
	//--//
	//var extension = req.body.picture.name.split(".").pop();
	//fs.rename(req.files.picture.path, "../public/imagenes/peliculas"+peliculas._id+"."+extension)
	var name = req.body.name;
	var email = req.body.email;
	var pedido = req.body.comentario;
	var telefono = req.body.telefono;


	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'jaime.paz.mero@gmail.com',
			pass: 'naruto2014'
		}
	});

	var mensaje = "Nombre: " + name + "\nPedido: " + pedido + "\nNúmero de telefono: " + telefono + "\nEmail: " + email + "";

	var mailOptions = {
		from: email,
		to: 'jaime199505@hotmail.com',
		subject: 'Cotización',
		text: mensaje
	};
	
	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log('Email enviado: ' + info.response);
			var hoy = new Date();
			var hora;
			hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
			console.log(hora);
			console.log(email + " " + pedido + " " + telefono + " " + name)
			res.status(200).render('cotizacion')
		}
	});


}

function postMail2(req, res) {
	console.log('Post /api/mails')
	let peliculas = new Peliculas()
	//--//
	//var extension = req.body.picture.name.split(".").pop();
	//fs.rename(req.files.picture.path, "../public/imagenes/peliculas"+peliculas._id+"."+extension)
	var name = req.body.nombre;
	var email = req.body.email;
	var pedido = req.body.comentario;
	var telefono = req.body.telefono;
	var razon = req.body.razon;


	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'jaime.paz.mero@gmail.com',
			pass: 'naruto2014'
		}
	});

	var mensaje = "Nombre: " + name + "\nMensaje: " + pedido + "\nNúmero de telefono: " + telefono + "\nEmail: " + email + "";

	var mailOptions = {
		from: email,
		to: 'jaime199505@hotmail.com',
		subject: razon,
		text: mensaje
	};
	if (name.length == 0 || /^\s+$/.test(name)) {
		fail;
		return false;
	  } else {
		if (email.length == 0 || /^\s+$/.test(email)) {
		  return false;
		  fail;
		} else {
		  if (comentario.length == 0 || /^\s+$/.test(comentario)) {
			return false;
			fail;
		  } else {
			if (telefono.length == 0 || /^\s+$/.test(telefono)) {
			  return false;
			  fail;
			} else {
			  swal({
				title: "Gracias por contactarnos",
				text: "Su petición fue enviada en breve nos contactaremos con usted.",
				icon: "success",
				buttons: true,
			  })
			  transporter.sendMail(mailOptions, function (error, info) {
				if (error) {
					console.log(error);
				} else {
					console.log('Email enviado: ' + info.response);
					console.log(email + " " + pedido + " " + telefono + " " + name)
					var hoy = new Date();
					var hora;
					hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
					console.log(hora);
					res.status(200).render('index')
				}
			});
			  return true;
			}
		  }

		}

	  }
}

module.exports = {
	postMail,
	postMail2
}